'use client';

import React, { useState } from 'react';
import styles from './BookingWorkflow.module.css';
import Button from '../Button';
import {
    calculateTotal,
    calculateNights,
    createReservation,
    BookingData
} from '../../utils/booking';

interface Room {
    id: string;
    nombre: string;
    descripcion: string;
    img_url: string;
    precio_base: number;
    capacidad: number;
}

interface BookingWorkflowProps {
    room: Room;
    checkIn: string;
    checkOut: string;
    guests: number;
}

interface GuestData {
    nombre: string;
    apellido: string;
    email: string;
    telefono: string;
}

interface PaymentData {
    cardNumber: string;
    cardName: string;
    expiry: string;
    cvv: string;
}

const BookingWorkflow: React.FC<BookingWorkflowProps> = ({
    room,
    checkIn: initialCheckIn,
    checkOut: initialCheckOut,
    guests: initialGuests
}) => {
    const [currentStep, setCurrentStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [reservationId, setReservationId] = useState<string | null>(null);

    // Estados editables para fechas y huespedes
    const [checkIn, setCheckIn] = useState<string>(initialCheckIn);
    const [checkOut, setCheckOut] = useState<string>(initialCheckOut);
    // Ajustar huespedes al maximo de la habitacion si excede
    const [guestsCount, setGuestsCount] = useState<number>(
        Math.min(initialGuests, room.capacidad)
    );

    const [guestData, setGuestData] = useState<GuestData>({
        nombre: '',
        apellido: '',
        email: '',
        telefono: ''
    });

    const [paymentData, setPaymentData] = useState<PaymentData>({
        cardNumber: '',
        cardName: '',
        expiry: '',
        cvv: ''
    });

    const nights = calculateNights(checkIn, checkOut);
    const totalPrice = calculateTotal(room.precio_base, checkIn, checkOut);

    const today = new Date().toISOString().split('T')[0]!;

    const steps = [
        { number: 1, title: 'Datos del Huesped' },
        { number: 2, title: 'Pago' },
        { number: 3, title: 'Confirmacion' }
    ];

    const validateStep1 = (): boolean => {
        if (!guestData.nombre.trim()) {
            setError('Por favor ingresa tu nombre');
            return false;
        }
        if (!guestData.apellido.trim()) {
            setError('Por favor ingresa tu apellido');
            return false;
        }
        if (!guestData.email.trim() || !guestData.email.includes('@')) {
            setError('Por favor ingresa un email valido');
            return false;
        }
        return true;
    };

    const validateStep2 = (): boolean => {
        if (!/^\d{16}$/.test(paymentData.cardNumber.replaceAll(/\s/g, ''))) {
            setError('Numero de tarjeta invalido (16 digitos)');
            return false;
        }
        if (!paymentData.cardName.trim()) {
            setError('Por favor ingresa el nombre en la tarjeta');
            return false;
        }
        if (!/^\d{2}\/\d{2}$/.test(paymentData.expiry)) {
            setError('Fecha de expiracion invalida (MM/YY)');
            return false;
        }

        const [expMonth, expYearStr] = paymentData.expiry.split('/');
        const expMonthNum = Number.parseInt(expMonth || '0', 10);
        const expYearNum = Number.parseInt(expYearStr || '0', 10) + 2000;

        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1;
        const currentYear = currentDate.getFullYear();

        if (expMonthNum < 1 || expMonthNum > 12) {
            setError('Mes de expiracion invalido');
            return false;
        }

        if (expYearNum < currentYear || (expYearNum === currentYear && expMonthNum < currentMonth)) {
            setError('La tarjeta ha expirado');
            return false;
        }
        if (!/^\d{3,4}$/.test(paymentData.cvv)) {
            setError('CVV invalido');
            return false;
        }
        return true;
    };

    const handleNext = () => {
        setError(null);

        if (currentStep === 1 && !validateStep1()) return;
        if (currentStep === 2 && !validateStep2()) return;

        setCurrentStep(prev => prev + 1);
    };

    const handleBack = () => {
        setError(null);
        setCurrentStep(prev => prev - 1);
    };

    const handleConfirm = async () => {
        setLoading(true);
        setError(null);

        const bookingData: BookingData = {
            tipo_habitacion_id: room.id,
            fecha_entrada: checkIn,
            fecha_salida: checkOut,
            huespedes_count: guestsCount,
            nombre_huesped: `${guestData.nombre} ${guestData.apellido}`,
            email_huesped: guestData.email,
            telefono_huesped: guestData.telefono || undefined,
            precio_total: totalPrice
        };

        const { data, error: reservationError } = await createReservation(bookingData);

        setLoading(false);

        if (reservationError) {
            const errorMessage = reservationError.message || 'Error desconocido';
            setError(`Error al crear la reservacion: ${errorMessage}`);
            console.error('Reservation error:', reservationError);
            return;
        }

        if (data) {
            setReservationId(data.id);
            setCurrentStep(4);
        }
    };

    const formatCardNumber = (value: string) => {
        const v = value.replaceAll(/\s+/g, '').replaceAll(/\D/g, '');
        const matches = v.match(/\d{4,16}/g);
        const match = matches?.[0] || '';
        const parts = [];
        for (let i = 0, len = match.length; i < len; i += 4) {
            parts.push(match.substring(i, i + 4));
        }
        return parts.length ? parts.join(' ') : value;
    };

    return (
        <div className={styles.workflowContainer}>
            <div className={styles.progressBar}>
                {steps.map((step, index) => (
                    <React.Fragment key={step.number}>
                        <div className={`${styles.step} ${currentStep >= step.number ? styles.active : ''
                            } ${currentStep > step.number ? styles.completed : ''}`}>
                            <div className={styles.stepNumber}>
                                {currentStep > step.number ? '\u2713' : step.number}
                            </div>
                            <span className={styles.stepTitle}>{step.title}</span>
                        </div>
                        {index < steps.length - 1 && (
                            <div className={`${styles.connector} ${currentStep > step.number ? styles.active : ''
                                }`} />
                        )}
                    </React.Fragment>
                ))}
            </div>

            <div className={styles.content}>
                <div className={styles.formColumn}>
                    {error && <div className={styles.error}>{error}</div>}

                    {currentStep === 1 && (
                        <div className={styles.stepContent}>
                            <h2 className={styles.stepHeading}>Datos del Huesped</h2>

                            <div className={styles.formRow}>
                                <div className={styles.inputGroup}>
                                    <label>
                                        <span>Nombre *</span>
                                        <input
                                            type="text"
                                            className={styles.input}
                                            value={guestData.nombre}
                                            onChange={(e) => setGuestData({
                                                ...guestData,
                                                nombre: e.target.value
                                            })}
                                            placeholder="Tu nombre"
                                        />
                                    </label>
                                </div>
                                <div className={styles.inputGroup}>
                                    <label>
                                        <span>Apellido *</span>
                                        <input
                                            type="text"
                                            className={styles.input}
                                            value={guestData.apellido}
                                            onChange={(e) => setGuestData({
                                                ...guestData,
                                                apellido: e.target.value
                                            })}
                                            placeholder="Tu apellido"
                                        />
                                    </label>
                                </div>
                            </div>

                            <div className={styles.inputGroup}>
                                <label>
                                    <span>Email *</span>
                                    <input
                                        type="email"
                                        className={styles.input}
                                        value={guestData.email}
                                        onChange={(e) => setGuestData({
                                            ...guestData,
                                            email: e.target.value
                                        })}
                                        placeholder="tu@email.com"
                                    />
                                </label>
                            </div>

                            <div className={styles.inputGroup}>
                                <label>
                                    <span>Telefono</span>
                                    <input
                                        type="tel"
                                        className={styles.input}
                                        value={guestData.telefono}
                                        onChange={(e) => setGuestData({
                                            ...guestData,
                                            telefono: e.target.value
                                        })}
                                        placeholder="+52 123 456 7890"
                                    />
                                </label>
                            </div>

                            <div className={styles.actions}>
                                <Button variant="primary" onClick={handleNext}>
                                    Continuar al Pago
                                </Button>
                            </div>
                        </div>
                    )}

                    {currentStep === 2 && (
                        <div className={styles.stepContent}>
                            <h2 className={styles.stepHeading}>Informacion de Pago</h2>
                            <p className={styles.disclaimer}>
                                Esta es una simulacion. No se procesara ningun pago real.
                            </p>

                            <div className={styles.cardPreview}>
                                <div className={styles.cardChip}></div>
                                <div className={styles.cardNumber}>
                                    {paymentData.cardNumber || '\u2022\u2022\u2022\u2022 \u2022\u2022\u2022\u2022 \u2022\u2022\u2022\u2022 \u2022\u2022\u2022\u2022'}
                                </div>
                                <div className={styles.cardDetails}>
                                    <span>{paymentData.cardName || 'NOMBRE TITULAR'}</span>
                                    <span>{paymentData.expiry || 'MM/YY'}</span>
                                </div>
                            </div>

                            <div className={styles.formRow}>
                                <div className={styles.inputGroup}>
                                    <label>
                                        <span>Numero de Tarjeta *</span>
                                        <input
                                            type="text"
                                            className={styles.input}
                                            value={paymentData.cardNumber}
                                            onChange={(e) => setPaymentData({
                                                ...paymentData,
                                                cardNumber: formatCardNumber(e.target.value)
                                            })}
                                            placeholder="1234 5678 9012 3456"
                                            maxLength={19}
                                        />
                                    </label>
                                </div>

                                <div className={styles.inputGroup}>
                                    <label>
                                        <span>Nombre en la Tarjeta *</span>
                                        <input
                                            type="text"
                                            className={styles.input}
                                            value={paymentData.cardName}
                                            onChange={(e) => setPaymentData({
                                                ...paymentData,
                                                cardName: e.target.value.toUpperCase()
                                            })}
                                            placeholder="NOMBRE APELLIDO"
                                        />
                                    </label>
                                </div>
                            </div>

                            <div className={styles.formRow}>
                                <div className={styles.inputGroup}>
                                    <label>
                                        <span>Fecha de Expiracion *</span>
                                        <input
                                            type="text"
                                            className={styles.input}
                                            value={paymentData.expiry}
                                            onChange={(e) => {
                                                let value = e.target.value.replaceAll(/\D/g, '');
                                                if (value.length >= 2) {
                                                    value = value.slice(0, 2) + '/' + value.slice(2, 4);
                                                }
                                                setPaymentData({
                                                    ...paymentData,
                                                    expiry: value
                                                });
                                            }}
                                            placeholder="MM/YY"
                                            maxLength={5}
                                        />
                                    </label>
                                </div>
                                <div className={styles.inputGroup}>
                                    <label>
                                        <span>CVV *</span>
                                        <input
                                            type="text"
                                            className={styles.input}
                                            value={paymentData.cvv}
                                            onChange={(e) => setPaymentData({
                                                ...paymentData,
                                                cvv: e.target.value.replaceAll(/\D/g, '')
                                            })}
                                            placeholder="123"
                                            maxLength={4}
                                        />
                                    </label>
                                </div>
                            </div>

                            <div className={styles.actions}>
                                <Button variant="outline" onClick={handleBack}>
                                    Atras
                                </Button>
                                <Button variant="primary" onClick={handleNext}>
                                    Revisar Reserva
                                </Button>
                            </div>
                        </div>
                    )}

                    {currentStep === 3 && (
                        <div className={styles.stepContent}>
                            <h2 className={styles.stepHeading}>Confirmar Reserva</h2>

                            <div className={styles.summarySection}>
                                <h3>Datos del Huesped</h3>
                                <p><strong>Nombre:</strong> {guestData.nombre} {guestData.apellido}</p>
                                <p><strong>Email:</strong> {guestData.email}</p>
                                {guestData.telefono && (
                                    <p><strong>Telefono:</strong> {guestData.telefono}</p>
                                )}
                            </div>

                            <div className={styles.summarySection}>
                                <h3>Metodo de Pago</h3>
                                <p>Tarjeta terminada en ****{paymentData.cardNumber.slice(-4)}</p>
                            </div>

                            <div className={styles.actions}>
                                <Button variant="outline" onClick={handleBack}>
                                    Atras
                                </Button>
                                <Button
                                    variant="primary"
                                    onClick={handleConfirm}
                                    className={loading ? styles.loading : ''}
                                >
                                    {loading ? 'Procesando...' : 'Confirmar Reserva'}
                                </Button>
                            </div>
                        </div>
                    )}

                    {currentStep === 4 && (
                        <div className={styles.stepContent}>
                            <div className={styles.successIcon}>{'\u2713'}</div>
                            <h2 className={styles.successHeading}>Reserva Confirmada!</h2>
                            <p className={styles.successMessage}>
                                Tu reservacion ha sido confirmada exitosamente.
                            </p>
                            {reservationId && (
                                <p className={styles.reservationId}>
                                    Numero de confirmacion: <strong>{reservationId.slice(0, 8).toUpperCase()}</strong>
                                </p>
                            )}
                            <p className={styles.emailNotice}>
                                Hemos enviado los detalles de tu reserva a {guestData.email}
                            </p>

                            <div className={styles.actions}>
                                <Button variant="primary" href="/">
                                    Volver al Inicio
                                </Button>
                            </div>
                        </div>
                    )}
                </div>

                <div className={styles.summaryColumn}>
                    <div className={styles.summaryCard}>
                        <img
                            src={room.img_url || '/placeholder-room.jpg'}
                            alt={room.nombre}
                            className={styles.roomImage}
                        />
                        <div className={styles.summaryContent}>
                            <h3 className={styles.roomName}>{room.nombre}</h3>

                            {/* Fechas editables */}
                            <div className={styles.editableDates}>
                                <div className={styles.dateInputGroup}>
                                    <label className={styles.dateInputLabel}>
                                        <span>Check-in</span>
                                        <input
                                            type="date"
                                            className={styles.dateInput}
                                            value={checkIn}
                                            min={today}
                                            onChange={(e) => setCheckIn(e.target.value)}
                                        />
                                    </label>
                                </div>
                                <div className={styles.dateInputGroup}>
                                    <label className={styles.dateInputLabel}>
                                        <span>Check-out</span>
                                        <input
                                            type="date"
                                            className={styles.dateInput}
                                            value={checkOut}
                                            min={checkIn}
                                            onChange={(e) => setCheckOut(e.target.value)}
                                        />
                                    </label>
                                </div>
                            </div>

                            {/* Huespedes editable - maximo segun capacidad de habitacion */}
                            <div className={styles.guestInputGroup}>
                                <label className={styles.dateInputLabel}>
                                    <span>Huespedes (max. {room.capacidad})</span>
                                    <select
                                        className={styles.guestSelect}
                                        value={guestsCount}
                                        onChange={(e) => setGuestsCount(Number(e.target.value))}
                                    >
                                        {Array.from({ length: room.capacidad }, (_, i) => i + 1).map(num => (
                                            <option key={num} value={num}>
                                                {num} {num === 1 ? 'Huesped' : 'Huespedes'}
                                            </option>
                                        ))}
                                    </select>
                                </label>
                            </div>

                            <div className={styles.priceBreakdown}>
                                <div className={styles.priceRow}>
                                    <span>${room.precio_base} x {nights} noches</span>
                                    <span>${totalPrice}</span>
                                </div>
                                <div className={styles.priceRow}>
                                    <span>Impuestos</span>
                                    <span>Incluidos</span>
                                </div>
                            </div>

                            <div className={styles.totalRow}>
                                <span>Total</span>
                                <span className={styles.totalPrice}>${totalPrice} USD</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingWorkflow;
