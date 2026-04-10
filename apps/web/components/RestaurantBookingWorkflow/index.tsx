'use client';

import React, { useState } from 'react';
import styles from './RestaurantBookingWorkflow.module.css';
import Button from '../Button';
import {
    createRestaurantReservation,
    RestaurantBookingData
} from '../../utils/restaurant-booking';

interface Restaurant {
    id: string;
    nombre: string;
    descripcion: string;
    img_url: string;
    tipo_comida: string;
}

interface RestaurantBookingWorkflowProps {
    restaurant: Restaurant;
    initialDate?: string;
    initialTime?: string;
    initialGuests?: number;
}

interface ClientData {
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

export default function RestaurantBookingWorkflow({
    restaurant,
    initialDate = new Date().toISOString().split('T')[0],
    initialTime = '19:00',
    initialGuests = 2
}: RestaurantBookingWorkflowProps) {
    const [currentStep, setCurrentStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [reservationId, setReservationId] = useState<string | null>(null);

    const [date, setDate] = useState<string>(initialDate as string);
    const [time, setTime] = useState<string>(initialTime as string);
    const [guestsCount, setGuestsCount] = useState<number>(initialGuests);

    const [clientData, setClientData] = useState<ClientData>({
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

    const steps = [
        { number: 1, title: 'Datos del Cliente' },
        { number: 2, title: 'Pago (Garantia)' },
        { number: 3, title: 'Confirmacion' }
    ];

    const validateStep1 = (): boolean => {
        if (!clientData.nombre.trim()) {
            setError('Por favor ingresa tu nombre');
            return false;
        }
        if (!clientData.apellido.trim()) {
            setError('Por favor ingresa tu apellido');
            return false;
        }
        if (!clientData.email.trim() || !clientData.email.includes('@')) {
            setError('Por favor ingresa un email valido');
            return false;
        }
        return true;
    };

    const validateStep2 = (): boolean => {
        // Simulacion de validacion de pago (garantia para reserva)
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

        const bookingData: RestaurantBookingData = {
            restaurante_id: restaurant.id,
            fecha: date,
            hora: time,
            numero_personas: guestsCount,
            nombre_cliente: `${clientData.nombre} ${clientData.apellido}`,
            email_cliente: clientData.email,
            telefono_cliente: clientData.telefono || undefined
        };

        const { data, error: reservationError } = await createRestaurantReservation(bookingData);

        setLoading(false);

        if (reservationError) {
            setError(`Error al crear la reservacion: ${reservationError.message}`);
            return;
        }

        if (data) {
            setReservationId(data.id);
            setCurrentStep(4);
        }
    };

    const formatCardNumber = (value: string) => {
        const v = value.replaceAll(/\s+/g, '').replaceAll(/\D/g, '');
        const parts = [];
        for (let i = 0, len = v.length; i < len; i += 4) {
            parts.push(v.substring(i, i + 4));
        }
        return parts.length ? parts.join(' ') : value;
    };

    return (
        <div className={styles.workflowContainer}>
            <div className={styles.progressBar}>
                {steps.map((step, index) => (
                    <React.Fragment key={step.number}>
                        <div className={`${styles.step} ${currentStep >= step.number ? styles.active : ''} ${currentStep > step.number ? styles.completed : ''}`}>
                            <div className={styles.stepNumber}>
                                {currentStep > step.number ? '\u2713' : step.number}
                            </div>
                            <span className={styles.stepTitle}>{step.title}</span>
                        </div>
                        {index < steps.length - 1 && (
                            <div className={`${styles.connector} ${currentStep > step.number ? styles.active : ''}`} />
                        )}
                    </React.Fragment>
                ))}
            </div>

            <div className={styles.content}>
                <div className={styles.formColumn}>
                    {error && <div className={styles.error}>{error}</div>}

                    {currentStep === 1 && (
                        <div className={styles.stepContent}>
                            <h2 className={styles.stepHeading}>Datos del Cliente</h2>
                            <div className={styles.formRow}>
                                <div className={styles.inputGroup}>
                                    <label>
                                        <span>Nombre *</span>
                                        <input
                                            type="text"
                                            className={styles.input}
                                            value={clientData.nombre}
                                            onChange={(e) => setClientData({ ...clientData, nombre: e.target.value })}
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
                                            value={clientData.apellido}
                                            onChange={(e) => setClientData({ ...clientData, apellido: e.target.value })}
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
                                        value={clientData.email}
                                        onChange={(e) => setClientData({ ...clientData, email: e.target.value })}
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
                                        value={clientData.telefono}
                                        onChange={(e) => setClientData({ ...clientData, telefono: e.target.value })}
                                        placeholder="+52 123 456 7890"
                                    />
                                </label>
                            </div>
                            <div className={styles.actions}>
                                <Button variant="primary" onClick={handleNext}>Continuar al Pago</Button>
                            </div>
                        </div>
                    )}

                    {currentStep === 2 && (
                        <div className={styles.stepContent}>
                            <h2 className={styles.stepHeading}>Garantia de Reserva</h2>
                            <p className={styles.disclaimer}>
                                Se requiere una tarjeta como garantia. No se realizara ningun cargo a menos que no se presente.
                            </p>
                            <div className={styles.cardPreview}>
                                <div className={styles.cardChip}></div>
                                <div className={styles.cardNumber}>{paymentData.cardNumber || '\u2022\u2022\u2022\u2022 \u2022\u2022\u2022\u2022 \u2022\u2022\u2022\u2022 \u2022\u2022\u2022\u2022'}</div>
                                <div className={styles.cardDetails}>
                                    <span>{paymentData.cardName || 'TITULAR'}</span>
                                    <span>{paymentData.expiry || 'MM/YY'}</span>
                                </div>
                            </div>
                            <div className={styles.inputGroup}>
                                <label>
                                    <span>Numero de Tarjeta *</span>
                                    <input
                                        type="text"
                                        className={styles.input}
                                        value={paymentData.cardNumber}
                                        onChange={(e) => setPaymentData({ ...paymentData, cardNumber: formatCardNumber(e.target.value) })}
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
                                        onChange={(e) => setPaymentData({ ...paymentData, cardName: e.target.value.toUpperCase() })}
                                        placeholder="NOMBRE APELLIDO"
                                    />
                                </label>
                            </div>
                            <div className={styles.formRow}>
                                <div className={styles.inputGroup}>
                                    <label>
                                        <span>Fecha Expiracion *</span>
                                        <input
                                            type="text"
                                            className={styles.input}
                                            value={paymentData.expiry}
                                            onChange={(e) => {
                                                let v = e.target.value.replaceAll(/\D/g, '');
                                                if (v.length >= 2) v = v.slice(0, 2) + '/' + v.slice(2, 4);
                                                setPaymentData({ ...paymentData, expiry: v });
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
                                            onChange={(e) => setPaymentData({ ...paymentData, cvv: e.target.value.replaceAll(/\D/g, '') })}
                                            placeholder="123"
                                            maxLength={4}
                                        />
                                    </label>
                                </div>
                            </div>
                            <div className={styles.actions}>
                                <Button variant="outline" onClick={handleBack}>Atras</Button>
                                <Button variant="primary" onClick={handleNext}>Revisar Reserva</Button>
                            </div>
                        </div>
                    )}

                    {currentStep === 3 && (
                        <div className={styles.stepContent}>
                            <h2 className={styles.stepHeading}>Confirmar Reserva</h2>
                            <div className={styles.summarySection}>
                                <h3>Detalles de la Reserva</h3>
                                <p><strong>Restaurante:</strong> {restaurant.nombre}</p>
                                <p><strong>Fecha:</strong> {date}</p>
                                <p><strong>Hora:</strong> {time}</p>
                                <p><strong>Personas:</strong> {guestsCount}</p>
                            </div>
                            <div className={styles.summarySection}>
                                <h3>Datos del Cliente</h3>
                                <p><strong>Nombre:</strong> {clientData.nombre} {clientData.apellido}</p>
                                <p><strong>Email:</strong> {clientData.email}</p>
                            </div>
                            <div className={styles.actions}>
                                <Button variant="outline" onClick={handleBack}>Atras</Button>
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
                            <p className={styles.successMessage}>Tu mesa ha sido reservada exitosamente.</p>
                            {reservationId && (
                                <p className={styles.reservationId}>
                                    ID: <strong>{reservationId.slice(0, 8).toUpperCase()}</strong>
                                </p>
                            )}
                            <div className={styles.actions}>
                                <Button variant="primary" href="/restaurantes">Volver a Restaurantes</Button>
                            </div>
                        </div>
                    )}
                </div>

                <div className={styles.summaryColumn}>
                    <div className={styles.summaryCard}>
                        <img src={restaurant.img_url || '/placeholder-restaurant.jpg'} className={styles.restaurantImage} />
                        <div className={styles.summaryContent}>
                            <h3 className={styles.restaurantName}>{restaurant.nombre}</h3>
                            <div className={styles.editableInfo}>
                                <div className={styles.infoInputGroup}>
                                    <label className={styles.infoInputLabel}>Fecha</label>
                                    <input type="date" className={styles.infoInput} value={date} onChange={(e) => setDate(e.target.value)} />
                                </div>
                                <div className={styles.infoInputGroup}>
                                    <label className={styles.infoInputLabel}>Hora</label>
                                    <input type="time" className={styles.infoInput} value={time} onChange={(e) => setTime(e.target.value)} />
                                </div>
                                <div className={styles.infoInputGroup}>
                                    <label className={styles.infoInputLabel}>Personas</label>
                                    <select className={styles.infoInput} value={guestsCount} onChange={(e) => setGuestsCount(Number(e.target.value))}>
                                        {[1, 2, 3, 4, 5, 6, 7, 8].map(n => <option key={n} value={n}>{n} {n === 1 ? 'Persona' : 'Personas'}</option>)}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
