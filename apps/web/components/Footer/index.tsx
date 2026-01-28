import React from 'react';
import styles from './Footer.module.css';

const Footer: React.FC = () => {
    return (
        <footer className={styles.footer}>
            <div className={`${styles.container} container`}>
                <div className={styles.grid}>
                    <div className={styles.info}>
                        <div className={styles.logo}>
                            <span className={styles.nexus}>NEXUS</span>
                            <span className={styles.hotel}>HOTEL</span>
                        </div>
                        <p className={styles.description}>
                            Innovative space booking for a modern world. Fast, secure, and reliable experience.
                        </p>
                    </div>
                    <div className={styles.links}>
                        <h4 className={styles.title}>Quick Links</h4>
                        <ul className={styles.linkList}>
                            <li><a href="/about">About Us</a></li>
                            <li><a href="/services">Services</a></li>
                            <li><a href="/security">Security</a></li>
                            <li><a href="/contact">Contact</a></li>
                        </ul>
                    </div>
                    <div className={styles.contact}>
                        <h4 className={styles.title}>Contact Info</h4>
                        <div className={styles.contactInfo}>
                            <p>123 Luxury Ave, Ocean City</p>
                            <p>contact@nexushotel.com</p>
                            <p>+1 (555) 123-4567</p>
                        </div>
                    </div>
                </div>
                <div className={styles.bottom}>
                    <p>&copy; {new Date().getFullYear()} Nexus Hotel. All rights reserved.</p>
                    <div className={styles.legal}>
                        <a href="/privacy">Privacy Policy</a>
                        <a href="/terms">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
