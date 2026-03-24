'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { User } from '@supabase/supabase-js';
import styles from './Navbar.module.css';
import Button from '../Button';
import AuthModal from '../AuthModal';
import { createSupabaseClient } from '../../utils/supabase/client';

const Navbar: React.FC = () => {

    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const supabase = createSupabaseClient();
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();

    useEffect(() => {
        const checkUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
        };

        checkUser();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
        });

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.refresh(); // Opcional: recargar para limpiar estados
    };



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
                        <Button variant="outline" href="/habitaciones">Book Now</Button>
                        {user ? (
                            <div className={styles.userMenu}>
                                <span className={styles.userEmail}>{user.email}</span>
                                <Button variant="secondary" onClick={handleSignOut}>Sign Out</Button>
                            </div>
                        ) : (
                            <Button variant="outline" onClick={() => setIsAuthModalOpen(true)}>Sign In</Button>
                        )}
                    </div>
                </div>
            </nav>
            <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
        </>
    );
};

export default Navbar;
