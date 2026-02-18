'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './BookingSearch.module.css';
import Button from '../Button';

interface BookingSearchProps {
    className?: string;
    variant?: 'hero' | 'inline';
}

const BookingSearch: React.FC<BookingSearchProps> = ({
    className = '',
    variant = 'inline'
}) => {
    const router = useRouter();

    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const formatDateForInput = (date: Date): string => date.toISOString().split('T')[0]!;

    const [checkIn, setCheckIn] = useState<string>(formatDateForInput(today));
    const [checkOut, setCheckOut] = useState<string>(formatDateForInput(tomorrow));
    const [guests, setGuests] = useState(2);
    const [error, setError] = useState<string | null>(null);

    const handleSearch = () => {
        setError(null);

        const checkInDate = new Date(checkIn);
        const checkOutDate = new Date(checkOut);

        if (checkOutDate <= checkInDate) {
            setError('La fecha de salida debe ser posterior a la entrada');
            return;
        }

        if (guests < 1) {
            setError('Debe haber al menos 1 huesped');
            return;
        }

        const params = new URLSearchParams({
            checkIn,
            checkOut,
            guests: guests.toString()
        });

        router.push(`/habitaciones?${params.toString()}`);
    };

    return (
        <div className={`${styles.searchContainer} ${styles[variant]} ${className}`}>
            <div className={styles.searchForm}>
                <div className={styles.inputGroup}>
                    <label htmlFor="checkIn" className={styles.label}>Check-in</label>
                    <input
                        type="date"
                        id="checkIn"
                        className={styles.input}
                        value={checkIn}
                        min={formatDateForInput(new Date())}
                        onChange={(e) => setCheckIn(e.target.value)}
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label htmlFor="checkOut" className={styles.label}>Check-out</label>
                    <input
                        type="date"
                        id="checkOut"
                        className={styles.input}
                        value={checkOut}
                        min={checkIn}
                        onChange={(e) => setCheckOut(e.target.value)}
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label htmlFor="guests" className={styles.label}>Huespedes</label>
                    <select
                        id="guests"
                        className={styles.input}
                        value={guests}
                        onChange={(e) => setGuests(Number(e.target.value))}
                    >
                        {[1, 2, 3, 4, 5, 6].map(num => (
                            <option key={num} value={num}>
                                {num} {num === 1 ? 'Huesped' : 'Huespedes'}
                            </option>
                        ))}
                    </select>
                </div>

                <Button
                    variant="primary"
                    onClick={handleSearch}
                    className={styles.searchButton}
                >
                    Buscar
                </Button>
            </div>

            {error && <div className={styles.error}>{error}</div>}
        </div>
    );
};

export default BookingSearch;
