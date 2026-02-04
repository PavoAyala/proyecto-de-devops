
import { createSupabaseClient } from '../../utils/supabase/client';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import styles from './page.module.css';
import Button from '../../components/Button';

interface Restaurant {
    id: string;
    nombre: string;
    descripcion: string;
    tipo_comida: string;
    img_url: string;
}

export const revalidate = 0;

export default async function RestaurantsPage() {
    const supabase = createSupabaseClient();
    const { data: restaurantes, error } = await supabase
        .from('restaurantes')
        .select('*')
        .returns<Restaurant[]>();

    if (error) {
        console.error('Error fetching restaurants:', error);
        return (
            <div>
                <Navbar />
                <main className={`${styles.pageContainer} container`}>
                    <h1 className={styles.heading}>Error loading dining options</h1>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div>
            <Navbar />
            <main className={`${styles.pageContainer} container`}>
                <h1 className={styles.heading}>Exquisite Dining</h1>

                {restaurantes?.map((restaurant, index) => (
                    <section key={restaurant.id} className={styles.section} style={{ animationDelay: `${index * 0.2}s` }}>
                        <div className={styles.imageWrapper}>
                            <img
                                src={restaurant.img_url || '/placeholder-restaurant.jpg'}
                                alt={restaurant.nombre}
                                className={styles.image}
                            />
                        </div>
                        <div className={`glass ${styles.content}`}>
                            <h2 className={styles.restaurantName}>{restaurant.nombre}</h2>
                            <span className={styles.cuisineType}>{restaurant.tipo_comida}</span>
                            <p className={styles.description}>{restaurant.descripcion}</p>
                            <Button variant="outline">Reserve a Table</Button>
                        </div>
                    </section>
                ))}

                {(!restaurantes || restaurantes.length === 0) && (
                    <p className="text-center text-gray-400">No restaurants currently available.</p>
                )}
            </main>
            <Footer />
        </div>
    );
}
