import { createSupabaseClient } from '../../utils/supabase/client';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import styles from './page.module.css';
import RoomCard from './RoomCard';

interface Room {
    id: string;
    nombre: string;
    descripcion: string;
    img_url: string;
    precio_base: number;
    capacidad: number;
}

export const revalidate = 0;

interface PageProps {
    searchParams: Promise<{
        checkIn?: string;
        checkOut?: string;
        guests?: string;
    }>;
}

export default async function RoomsPage({ searchParams }: PageProps) {
    const params = await searchParams;
    const { checkIn, checkOut, guests } = params;

    const supabase = createSupabaseClient();

    let query = supabase.from('tipos_habitacion').select('*');

    if (guests) {
        query = query.gte('capacidad', parseInt(guests));
    }

    const { data: rooms, error } = await query.returns<Room[]>();

    if (error) {
        console.error('Error fetching rooms:', error);
        return (
            <div>
                <Navbar />
                <main className={`${styles.pageContainer} container`}>
                    <h1 className={styles.heading}>Error loading rooms</h1>
                    <p>Please try again later.</p>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div>
            <Navbar />
            <main className={`${styles.pageContainer} container`}>
                <h1 className={styles.heading}>Our Rooms</h1>

                {checkIn && checkOut && (
                    <div className={styles.searchInfo}>
                        <p>
                            Mostrando habitaciones disponibles del{' '}
                            <strong>{new Date(checkIn).toLocaleDateString('es-ES')}</strong> al{' '}
                            <strong>{new Date(checkOut).toLocaleDateString('es-ES')}</strong>
                            {guests && <> para <strong>{guests} huespedes</strong></>}
                        </p>
                    </div>
                )}

                <div className={styles.grid}>
                    {rooms?.map((room) => (
                        <RoomCard
                            key={room.id}
                            room={room}
                            checkIn={checkIn}
                            checkOut={checkOut}
                            guests={guests}
                        />
                    ))}
                </div>
            </main>
            <Footer />
        </div>
    );
}
