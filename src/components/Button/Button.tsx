import type {
  ComponentPropsWithRef, ReactNode,
} from 'react';
//import styles from './Button.module.css';

import * as styles from './Button.css';

export type ButtonVariant = 'fill' | 'outline' | 'text';
export type ButtonSize = 'S' | 'M' | 'L';

type BaseProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
};

type AsButtonProps = BaseProps & {
  as?: 'button';
} & Omit<ComponentPropsWithRef<'button'>, keyof BaseProps | 'as'>;

type AsLinkProps = BaseProps & {
  as: 'a';
  href: string;
} & Omit<ComponentPropsWithRef<'a'>,
  keyof BaseProps | 'as' | 'href' | 'disabled'
>;

export type ButtonProps = AsButtonProps | AsLinkProps;

export const Button = (props: ButtonProps) => {
  const {
    variant = 'fill',
    size = 'M',
    className = '',
    children,
  } = props;

  const sizeClasses = {
    S: styles.sizeS,
    M: styles.sizeM,
    L: styles.sizeL,
  };

  const buttonClasses = [
    styles.button,
    styles.variantVariants[variant],
    sizeClasses[size],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  if (props.as === 'a') {
    const { as, ref, ...rest } = props;

    return (
      <a ref={ref} className={buttonClasses} {...rest}>
        {children}
      </a>
    );
  }

  const { as, ref, type = 'button', ...rest } = props;

  return (
    <button ref={ref} type={type} className={buttonClasses} {...rest}>
      {children}
    </button>
  );

  // const { as, ref, ...rest } = props;

  // const Tag = as as ElementType;

  // return (
  //   <Tag ref={ref} className={buttonClasses} {...rest}> // Тут TS не понимает, какой тип ему прилетел
  //     {children}                                        // И не работает, кидает warning
  //   </Tag>                                              // Поэтому приходится сужать типы (вверху)
  // );
};