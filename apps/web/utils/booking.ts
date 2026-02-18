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

    try {
        const { data, error } = await supabase
            .from('orders')
            .insert([{
                room_type_id: bookingData.tipo_habitacion_id,
                check_in: bookingData.fecha_entrada,
                check_out: bookingData.fecha_salida,
                guests_count: bookingData.huespedes_count,
                guest_name: bookingData.nombre_huesped,
                guest_email: bookingData.email_huesped,
                guest_phone: bookingData.telefono_huesped || null,
                total_amount: bookingData.precio_total,
                status: 'confirmed'
            }])
            .select()
            .single();

        if (error) {
            console.error('Supabase error:', error);
            return {
                data: null,
                error: { message: error.message || 'Error al insertar en la base de datos' }
            };
        }

        return {
            data: data as Reservation,
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
