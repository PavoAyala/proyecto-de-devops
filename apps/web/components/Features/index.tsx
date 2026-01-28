import React from 'react';
import styles from './Features.module.css';

const Features: React.FC = () => {
    const features = [
        {
            title: 'Reliable Booking',
            description: 'Our system guarantees your reservation without errors, giving you peace of mind from the moment you book.',
            icon: '🛡️'
        },
        {
            title: 'Fast & Effortless',
            description: 'Say goodbye to waiting on hold. Book your space in seconds through our intuitive interface.',
            icon: '⚡'
        },
        {
            title: 'Secure Payments',
            description: 'Your financial and personal data are protected by industry-leading encryption and security protocols.',
            icon: '🔒'
        }
    ];

    return (
        <section id="features" className={styles.features}>
            <div className="container">
                <div className={styles.grid}>
                    {features.map((feature, index) => (
                        <div key={feature.title} className={styles.feature}>
                            <div className={styles.icon}>{feature.icon}</div>
                            <h3 className={styles.featureTitle}>{feature.title}</h3>
                            <p className={styles.featureDescription}>{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
