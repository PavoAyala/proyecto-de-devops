import React from 'react';
import styles from './Hero.module.css';
import Button from '../Button';

const Hero: React.FC = () => {
    return (
        <section className={styles.hero}>
            <div className={`${styles.container} container`}>
                <div className={styles.content}>
                    <h1 className={styles.title}>
                        Experience <span className={styles.highlight}>Nexus Luxury</span>
                    </h1>
                    <p className={styles.subtitle}>
                        Innovative digital booking for rooms, restaurant tables, and exclusive events. Fast, secure, and designed for your comfort.
                    </p>
                    <div className={styles.actions}>
                        <Button variant="primary" className={styles.cta} href="habitaciones">Explore Rooms</Button>
                        <Button variant="secondary" className={styles.cta} href="#restaurant">View Restaurant</Button>
                    </div>
                </div>
            </div>
            <div className={styles.overlay}></div>
        </section>
    );
};

export default Hero;
