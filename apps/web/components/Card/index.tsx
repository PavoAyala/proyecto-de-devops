import React from 'react';
import styles from './Card.module.css';

interface CardProps {
    title: string;
    description: string;
    icon?: React.ReactNode;
    image?: string;
    children?: React.ReactNode;
    className?: string;
}

const Card: React.FC<CardProps> = ({
    title,
    description,
    icon,
    image,
    children,
    className = ''
}) => {
    return (
        <div className={`glass ${styles.card} ${className}`}>
            {image && (
                <div className={styles.imageWrapper}>
                    <img src={image} alt={title} className={styles.image} />
                </div>
            )}
            <div className={styles.content}>
                {icon && <div className={styles.icon}>{icon}</div>}
                <h3 className={styles.title}>{title}</h3>
                <p className={styles.description}>{description}</p>
                {children}
            </div>
        </div>
    );
};

export default Card;
