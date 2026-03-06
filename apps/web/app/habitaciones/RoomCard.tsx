'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Card from '../../components/Card';
import Button from '../../components/Button';
import { calculateTotal, calculateNights } from '../../utils/booking';
import styles from './page.module.css';

interface Room {
    id: string;
    nombre: string;
    descripcion: string;
    img_url: string;
    precio_base: number;
    capacidad: number;
}

interface RoomCardProps {
    room: Room;
    checkIn?: string;
    checkOut?: string;
    guests?: string;
}

const RoomCard: React.FC<RoomCardProps> = ({ room, checkIn, checkOut, guests }) => {
    const router = useRouter();

    const nights = checkIn && checkOut ? calculateNights(checkIn, checkOut) : 0;
    const totalPrice = checkIn && checkOut
        ? calculateTotal(room.precio_base, checkIn, checkOut)
        : room.precio_base;

    const handleBook = () => {
        // Si no hay fechas, usar hoy y manana como default
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        const formatDate = (date: Date): string => date.toISOString().split('T')[0]!;

        const finalCheckIn = checkIn || formatDate(today);
        const finalCheckOut = checkOut || formatDate(tomorrow);
        const finalGuests = guests || '2';

        const params = new URLSearchParams({
            roomId: room.id,
            checkIn: finalCheckIn,
            checkOut: finalCheckOut,
            guests: finalGuests
        });

        router.push(`/reservar?${params.toString()}`);
    };

    return (
        <Card
            title={room.nombre}
            description={room.descripcion}
            image={room.img_url || '/placeholder-room.jpg'}
            className={styles.cardContent}
        >
            <div className={styles.price}>
                ${room.precio_base} / night
            </div>

            {nights > 0 && (
                <div className={styles.totalPrice}>
                    {nights} noches = <strong>${totalPrice}</strong>
                </div>
            )}

            <div className={styles.details}>
                <span>Capacidad: {room.capacidad} personas</span>
            </div>

            <Button
                variant="primary"
                className={styles.bookButton}
                onClick={handleBook}
            >
                Reservar
            </Button>
        </Card>
    );
};

export default RoomCard;
