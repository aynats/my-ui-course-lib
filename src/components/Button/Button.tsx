import React, { type ComponentPropsWithRef } from 'react';
import styles from './Button.module.css';

export type ButtonVariant = 'fill' | 'outline' | 'text';
export type ButtonSize = 'S' | 'M' | 'L';

type BaseButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
};

// 2. Пропсы конкретно для кнопки
type AsButtonProps = BaseButtonProps & ComponentPropsWithRef<'button'> & {
  as?: 'button';
};

// 3. Пропсы конкретно для ссылки
type AsLinkProps = BaseButtonProps & ComponentPropsWithRef<'a'> & {
  as: 'a'; // Для ссылки этот пропс обязателен
};

// 4. Объединяем их: теперь компонент может быть либо одним, либо другим
export type ButtonProps = AsButtonProps | AsLinkProps;

export const Button = ({
  variant = 'fill',
  size = 'M',
  className = '',
  children,
  as = 'button',
  ...rest
}: ButtonProps) => {
  const buttonClasses = [
    styles.button,
    styles[`variant-${variant}`],
    styles[`size-${size}`],
    className,
  ].filter(Boolean).join(' ');

  const Tag = as as React.ElementType;

  return (
    <Tag
      className={buttonClasses}
      {...rest}
    >
      {children}
    </Tag>
  );
};