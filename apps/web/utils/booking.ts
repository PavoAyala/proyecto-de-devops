import { createSupabaseClient } from './supabase/client';

// Tipos
export interface BookingData {
    tipo_habitacion_id: string;
    fecha_entrada: string;
    fecha_salida: string;
    huespedes_count: number;
    nombre_huesped: string;
    email_huesped: string;
    telefono_huesped?: string;
    precio_total: number;
}

export interface Reservation extends BookingData {
    id: string;
    created_at: string;
    estado: 'confirmada' | 'cancelada' | 'pendiente';
}

export function calculateNights(checkIn: string, checkOut: string): number {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
}

export function calculateTotal(pricePerNight: number, checkIn: string, checkOut: string): number {
    const nights = calculateNights(checkIn, checkOut);
    return nights * pricePerNight;
}

export function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    });
}

export async function createReservation(bookingData: BookingData): Promise<{
    data: Reservation | null;
    error: { message: string } | null;
}> {
    const supabase = createSupabaseClient();

    // 1. Obtener usuario autenticado (necesario para la tabla 'reservas')
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
        console.error('Authentication error:', authError);
        return {
            data: null,
            error: { message: 'Debes iniciar sesión para realizar una reserva.' }
        };
    }

    try {
        // 2. Buscar una habitación disponible del tipo solicitado
        // Nota: Esto es una simplificación. En producción se debe verificar disponibilidad por fechas.
        const { data: rooms, error: roomError } = await supabase
            .from('habitaciones')
            .select('id, hotel_id')
            .eq('tipo_id', bookingData.tipo_habitacion_id)
            .eq('estado', 'disponible') // Asumiendo que 'disponible' es un estado válido
            .limit(1);

        if (roomError) {
            console.error('Error fetching room:', roomError);
            return { data: null, error: { message: 'Error al buscar disponibilidad.' } };
        }

        if (!rooms || rooms.length === 0) {
            return {
                data: null,
                error: { message: 'Lo sentimos, no hay habitaciones disponibles de este tipo en este momento.' }
            };
        }

        const habitacion = rooms[0];

        if (!habitacion) {
            return {
                data: null,
                error: { message: 'Error inesperado al recuperar datos de la habitación.' }
            };
        }

        // 3. Insertar en tabla padre 'reservas'
        const { data: reserva, error: reservaError } = await supabase
            .from('reservas')
            .insert([{
                usuario_id: user.id,
                hotel_id: habitacion.hotel_id,
                tipo_reserva: 'habitacion',
                fecha: new Date().toISOString(), // Fecha de la transacción/creación
                estado: 'confirmada' // O 'pendiente' si hay flujo de pago real
            }])
            .select()
            .single();

        if (reservaError) {
            console.error('Supabase error (reservas):', reservaError);
            return {
                data: null,
                error: { message: reservaError.message || 'Error al crear el registro de reserva' }
            };
        }

        // 4. Calcular precio por noche para el registro
        const nights = calculateNights(bookingData.fecha_entrada, bookingData.fecha_salida);
        const precioNoche = nights > 0 ? bookingData.precio_total / nights : bookingData.precio_total;

        // 5. Insertar en tabla hija 'reservas_habitaciones'
        const { error: detalleError } = await supabase
            .from('reservas_habitaciones')
            .insert([{
                reserva_id: reserva.id,
                habitacion_id: habitacion.id,
                fecha_entrada: bookingData.fecha_entrada,
                fecha_salida: bookingData.fecha_salida,
                precio_noche: precioNoche,
                total: bookingData.precio_total
            }]);

        if (detalleError) {
            console.error('Supabase error (reservas_habitaciones):', detalleError);
            // Nota: Aquí quedaría un registro huérfano en 'reservas' si falla.
            // Idealmente se limpiaría, pero por simplicidad retornamos error.
            return {
                data: null,
                error: { message: detalleError.message || 'Error al guardar detalles de la habitación' }
            };
        }

        // 6. Retornar objeto compatible con Reservation
        // Nota: Los campos de BookingData (nombre_huesped, etc) no se guardaron en DB
        // porque no existen en el esquema, pero se retornan para la UI.
        return {
            data: {
                ...bookingData,
                id: reserva.id,
                created_at: reserva.creado_en || new Date().toISOString(),
                estado: reserva.estado
            } as Reservation,
            error: null
        };

    } catch (err) {
        console.error('Unexpected error:', err);
        return {
            data: null,
            error: { message: 'Error inesperado al crear la reservacion' }
        };
    }
}

export function validateDates(checkIn: string, checkOut: string): {
    valid: boolean;
    error?: string;
} {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    if (checkInDate < today) {
        return { valid: false, error: 'La fecha de entrada no puede ser anterior a hoy' };
    }

    if (checkOutDate <= checkInDate) {
        return { valid: false, error: 'La fecha de salida debe ser posterior a la entrada' };
    }

    return { valid: true };
}
