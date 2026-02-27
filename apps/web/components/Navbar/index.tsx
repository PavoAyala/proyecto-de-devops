'use client';

import React, { useState } from 'react';
import styles from './Navbar.module.css';
import Button from '../Button';
import AuthModal from '../AuthModal';

const Navbar: React.FC = () => {
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

    return (
        <>
            <nav className={`${styles.navbar} glass`}>
                <div className={`${styles.container} container`}>
                    <a href="/" className={styles.logo}>
                        <span className={styles.nexus}>NEXUS</span>
                        <span className={styles.hotel}>HOTEL</span>
                    </a>
                    <ul className={styles.navLinks}>
                        <li><a id="rooms" href="/habitaciones" className={styles.link}>Rooms</a></li>
                        <li><a id="restaurant" href="/restaurantes" className={styles.link}>Restaurant</a></li>
                        <li><a id="experiences" href="/experiences" className={styles.link}>Experiences</a></li>
                    </ul>
                    <div className={styles.actions}>
                        <Button variant="outline">Book Now</Button>
                        <Button variant="outline" onClick={() => setIsAuthModalOpen(true)}>Sign In</Button>
                    </div>
                </div>
            </nav>
            <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
        </>
    );
};

export default Navbar;
