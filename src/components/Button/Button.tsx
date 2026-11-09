import type {
  ComponentPropsWithRef, ReactNode,
} from 'react';
//import styles from './Button.module.css';

import * as styles from './Button.css';

export type ButtonVariant = 'fill' | 'outline' | 'text';
export type ButtonSize = 'S' | 'M' | 'L';
export type ButtonDensity = 'default' | 'compact';

type BaseProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  density?: ButtonDensity;
  children?: ReactNode;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
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
    density = 'default',
    children,
    startIcon,
    endIcon,
  } = props;

  const buttonClasses = [
    styles.button,
    styles.variantVariants[variant],
    styles.sizeVariants[size],
    styles.densityVariants[density],
    className,
  ]
    .filter(Boolean)
    .join(' ');


  const content = (
    <>
      {startIcon && (
        <span className={styles.icon} aria-hidden="true">
          {startIcon}
        </span>
      )}

      {children}

      {endIcon && (
        <span className={styles.icon} aria-hidden="true">
          {endIcon}
        </span>
      )}
    </>
  );

  if (props.as === 'a') {
    const {
      as,
      ref,
      variant,
      size,
      density,
      className,
      children,
      startIcon,
      endIcon,
      ...rest } = props;

    return (
      <a ref={ref} className={buttonClasses} {...rest}>
        {content}
      </a>
    );
  }

  const { as, ref, type = 'button', ...rest } = props;

  return (
    <button ref={ref} type={type} className={buttonClasses} {...rest}>
      {content}
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