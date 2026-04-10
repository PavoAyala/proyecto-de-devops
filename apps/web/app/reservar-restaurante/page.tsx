import { createSupabaseClient } from '../../utils/supabase/client';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import RestaurantBookingWorkflow from '../../components/RestaurantBookingWorkflow';
import styles from './page.module.css';

interface Restaurant {
    id: string;
    nombre: string;
    descripcion: string;
    img_url: string;
    tipo_comida: string;
}

interface PageProps {
    searchParams: Promise<{
        restaurantId?: string;
        date?: string;
        time?: string;
        guests?: string;
    }>;
}

export default async function ReservarRestaurantePage({ searchParams }: PageProps) {
    const params = await searchParams;
    const { restaurantId, date, time, guests } = params;

    if (!restaurantId) {
        return (
            <div>
                <Navbar />
                <main className={`${styles.pageContainer} container`}>
                    <h1 className={styles.heading}>Informacion incompleta</h1>
                    <p className={styles.errorText}>
                        Por favor selecciona un restaurante desde la pagina de restaurantes.
                    </p>
                    <a href="/restaurantes" className={styles.backLink}>
                        Ir a Restaurantes
                    </a>
                </main>
                <Footer />
            </div>
        );
    }

    const supabase = createSupabaseClient();
    const { data: restaurant, error } = await supabase
        .from('restaurantes')
        .select('*')
        .eq('id', restaurantId)
        .single<Restaurant>();

    if (error || !restaurant) {
        return (
            <div>
                <Navbar />
                <main className={`${styles.pageContainer} container`}>
                    <h1 className={styles.heading}>Restaurante no encontrado</h1>
                    <a href="/restaurantes" className={styles.backLink}>
                        Ver todos los restaurantes
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
                <h1 className={styles.heading}>Reservar Mesa en {restaurant.nombre}</h1>
                <RestaurantBookingWorkflow
                    restaurant={restaurant}
                    initialDate={date}
                    initialTime={time}
                    initialGuests={guests ? parseInt(guests) : 2}
                />
            </main>
            <Footer />
        </div>
    );
}
