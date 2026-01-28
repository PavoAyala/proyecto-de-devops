import React from 'react';
import styles from './Navbar.module.css';
import Button from '../Button';

const Navbar: React.FC = () => {
    return (
        <nav className={`${styles.navbar} glass`}>
            <div className={`${styles.container} container`}>
                <div className={styles.logo}>
                    <span className={styles.nexus}>NEXUS</span>
                    <span className={styles.hotel}>HOTEL</span>
                </div>
                <ul className={styles.navLinks}>
                    <li><a id="rooms" href="#rooms" className={styles.link}>Rooms</a></li>
                    <li><a id="restaurant" href="#restaurant" className={styles.link}>Restaurant</a></li>
                    <li><a id="events" href="#events" className={styles.link}>Events</a></li>
                </ul>
                <div className={styles.actions}>
                    <Button variant="outline">Book Now</Button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
