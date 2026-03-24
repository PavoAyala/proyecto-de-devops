import { createSupabaseClient } from '../../utils/supabase/client';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import BookingWorkflow from '../../components/BookingWorkflow';
import styles from './page.module.css';

interface Room {
    id: string;
    nombre: string;
    descripcion: string;
    img_url: string;
    precio_base: number;
    capacidad: number;
}

interface PageProps {
    searchParams: Promise<{
        roomId?: string;
        checkIn?: string;
        checkOut?: string;
        guests?: string;
    }>;
}

export default async function ReservarPage({ searchParams }: PageProps) {
    const params = await searchParams;
    const { roomId, checkIn, checkOut, guests } = params;

    if (!roomId || !checkIn || !checkOut) {
        return (
            <div>
                <Navbar />
                <main className={`${styles.pageContainer} container`}>
                    <h1 className={styles.heading}>Informacion incompleta</h1>
                    <p className={styles.errorText}>
                        Por favor selecciona una habitacion y fechas desde la pagina de habitaciones.
                    </p>
                    <a href="/habitaciones" className={styles.backLink}>
                        Ir a Habitaciones
                    </a>
                </main>
                <Footer />
            </div>
        );
    }

    const supabase = createSupabaseClient();
    const { data: room, error } = await supabase
        .from('tipos_habitacion')
        .select('*')
        .eq('id', roomId)
        .single<Room>();

    if (error || !room) {
        return (
            <div>
                <Navbar />
                <main className={`${styles.pageContainer} container`}>
                    <h1 className={styles.heading}>Habitacion no encontrada</h1>
                    <a href="/habitaciones" className={styles.backLink}>
                        Ver todas las habitaciones
                    </a>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div>
            <Navbar />
            <main className={`${styles.pageContainer} container`}>
                <h1 className={styles.heading}>Completar Reserva</h1>
                <BookingWorkflow
                    room={room}
                    checkIn={checkIn}
                    checkOut={checkOut}
                    guests={parseInt(guests || '1')}
                />
            </main>
            <Footer />
        </div>
    );
}
