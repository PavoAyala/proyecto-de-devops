import React from 'react';
import styles from './Services.module.css';
import Card from '../Card';
import Button from '../Button';

const Services: React.FC = () => {
    const services = [
        {
            title: 'Luxury Rooms',
            description: 'Find the perfect suite for your stay with a few clicks. Secure and instant confirmation.',
            image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&q=80&w=2070',
            tag: 'Rooms'
        },
        {
            title: 'Fine Dining',
            description: 'Reserve your table at our world-class restaurant. Authentic flavors await you.',
            image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=2070',
            tag: 'Tables'
        },
        {
            title: 'Grand Events',
            description: 'Professional spaces for meetings, weddings, and celebrations. Tailored to your needs.',
            image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=2070',
            tag: 'Spaces'
        }
    ];

    return (
        <section id="services" className={styles.services}>
            <div className="container">
                <div className={styles.header}>
                    <h2 className={styles.headerTitle}>Exemplary Services</h2>
                    <p className={styles.headerSubtitle}>Everything you need for an unforgettable experience at Nexus Hotel.</p>
                </div>
                <div className={styles.grid}>
                    {services.map((service, index) => (
                        <Card
                            key={index}
                            title={service.title}
                            description={service.description}
                            image={service.image}
                        >
                            <Button variant="outline">Book {service.tag}</Button>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
