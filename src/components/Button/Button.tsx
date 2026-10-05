import React from 'react';
import styles from './Button.module.css';

export type ButtonVariant = 'fill' | 'outline' | 'text';
export type ButtonSize = 'S' | 'M' | 'L';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
}

export const Button = ({
  variant = 'fill',
  size = 'M',
  className = '',
  children,
  ...rest
}: ButtonProps) => {
  const buttonClasses = [
    styles.button,
    styles[`variant-${variant}`],
    styles[`size-${size}`],
    className,
  ].filter(Boolean).join(' ');

  return (
    <button
      className={buttonClasses}
      {...rest}
    >
      {children}
    </button>
  );
};