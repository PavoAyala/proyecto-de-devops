import React from 'react';
import styles from './Button.module.css';

interface ButtonProps {
    children: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'outline';
    onClick?: () => void;
    className?: string;
    href?: string;
}

const Button: React.FC<ButtonProps> = ({
    children,
    variant = 'primary',
    onClick,
    className = '',
    href
}) => {
    const buttonClass = `${styles.button} ${styles[variant]} ${className}`;

    if (href) {
        return (
            <a href={href} className={buttonClass}>
                {children}
            </a>
        );
    }

    return (
        <button className={buttonClass} onClick={onClick}>
            {children}
        </button>
    );
};

export default Button;
