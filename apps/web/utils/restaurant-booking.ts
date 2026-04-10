import { createSupabaseClient } from './supabase/client';

// Tipos
export interface RestaurantBookingData {
    restaurante_id: string;
    fecha: string;
    hora: string;
    numero_personas: number;
    nombre_cliente: string;
    email_cliente: string;
    telefono_cliente?: string;
    notas?: string;
}

export interface RestaurantReservation extends RestaurantBookingData {
    id: string;
    created_at: string;
    estado: 'confirmada' | 'cancelada' | 'pendiente';
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

export async function createRestaurantReservation(bookingData: RestaurantBookingData): Promise<{
    data: RestaurantReservation | null;
    error: { message: string } | null;
}> {
    const supabase = createSupabaseClient();

    // 1. Obtener usuario autenticado
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
        console.error('Authentication error:', authError);
        return {
            data: null,
            error: { message: 'Debes iniciar sesión para realizar una reserva.' }
        };
    }

    try {
        // En un monorepo real, esto lo suele manejar un trigger de Supabase.
        // Pero para asegurar que funcione en este entorno, verificamos si el usuario existe en 'public.usuarios'
        const { data: publicUser, error: publicUserError } = await supabase
            .from('usuarios')
            .select('id')
            .eq('id', user.id)
            .single();

        if (publicUserError || !publicUser) {
            console.log('User not found in public.usuarios, creating...');
            const { error: insertUserError } = await supabase
                .from('usuarios')
                .insert([{
                    id: user.id,
                    nombre: bookingData.nombre_cliente || user.email?.split('@')[0]
                }]);
            
            if (insertUserError) {
                console.error('Error creating public user:', insertUserError);
                // Si falla el insert del usuario, es probable que la reserva falle también por la FK
            }
        }
        // 2. Usar el ID del hotel proporcionado por el usuario
        const hotelId = 'd8017cba-6c26-4f9a-991f-803eb6bc2854';

        // 3. Insertar en tabla padre 'reservas'
        const { data: reserva, error: reservaError } = await supabase
            .from('reservas')
            .insert([{
                usuario_id: user.id,
                hotel_id: hotelId,
                tipo_reserva: 'restaurante',
                fecha: new Date().toISOString(),
                estado: 'confirmada'
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

        // 4. Insertar en tabla hija 'reservas_restaurantes'
        const { error: detalleError } = await supabase
            .from('reservas_restaurantes')
            .insert([{
                reserva_id: reserva.id,
                restaurante_id: bookingData.restaurante_id,
                fecha: bookingData.fecha,
                hora: bookingData.hora,
                numero_personas: bookingData.numero_personas,
                notas: bookingData.notas
            }]);

        if (detalleError) {
            console.error('Supabase error (reservas_restaurantes):', detalleError);
            return {
                data: null,
                error: { message: detalleError.message || 'Error al guardar detalles del restaurante' }
            };
        }

        return {
            data: {
                ...bookingData,
                id: reserva.id,
                created_at: reserva.creado_en || new Date().toISOString(),
                estado: reserva.estado
            } as RestaurantReservation,
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
