
import { createSupabaseClient } from '../../utils/supabase/client';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Card from '../../components/Card';
import styles from './page.module.css';
import Button from '../../components/Button';

interface Room {
    id: string;
    nombre: string;
    descripcion: string;
    img_url: string;
    precio_base: number;
    capacidad: number;
}

export const revalidate = 0; // Disable caching to fetch fresh data

export default async function RoomsPage() {
    const supabase = createSupabaseClient();
    const { data: rooms, error } = await supabase
        .from('tipos_habitacion')
        .select('*')
        .returns<Room[]>();

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
                <div className={styles.grid}>
                    {rooms?.map((room) => (
                        <Card
                            key={room.id}
                            title={room.nombre}
                            description={room.descripcion}
                            image={room.img_url || '/placeholder-room.jpg'}
                            className={styles.cardContent}
                        >
                            <div className={styles.price}>${room.precio_base} / night</div>
                            <div className={styles.details}>
                                <span>Capacity: {room.capacidad} persons</span>
                            </div>
                            <Button variant="primary" className={styles.bookButton}>
                                Book Now
                            </Button>
                        </Card>
                    ))}
                </div>
            </main>
            <Footer />
        </div>
    );
}
