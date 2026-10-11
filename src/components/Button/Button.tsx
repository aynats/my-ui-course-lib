import type {
  ComponentPropsWithRef, ReactNode,
} from 'react';
import styles from './Button.module.css';

export type ButtonVariant = 'fill' | 'outline' | 'text';
export type ButtonSize = 'S' | 'M' | 'L';

// Делаем базовые пропы, нужные для определения вида кнопки и детей
type BaseProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
};

// Пропы для кнопки как кнопки: берем базовые пропы, берем вариативный проп as (у нас button 
// по дефолту стоит), а также выкидываем из типа реф-компонента наши базовые пропы и as, чтобы 
// они потом когда-нибудь с друг другом не конфликтовали. 
// По крайней мере, точно надо убрать children. Всего остального там конеш нет, но раз уж 
// убирать, так всё. 
type AsButtonProps = BaseProps & {
  as?: 'button';
} & Omit<ComponentPropsWithRef<'button'>, keyof BaseProps | 'as'>;

// Аналогично ставим пропы для ссылки. Берем все базовые, берем обязательный (!) as и
// обязательный (!) href. И берем тип с рефом, выкидывая из него базу, as, href (мы его уже взяли)
// это надо, чтобы он не перезаписался. И disabled, потому что у кнопки его нет по доступности --
// Это в случае чего делается через aria-атрибут.
type AsLinkProps = BaseProps & {
  as: 'a';
  href: string;
} & Omit<ComponentPropsWithRef<'a'>,
  keyof BaseProps | 'as' | 'href' | 'disabled'
>;

// Делаем юнион из всего выше написанного. Получается винегрет
export type ButtonProps = AsButtonProps | AsLinkProps;

// Делаем деструктуризацию. Не вытаскиваем всё подряд - это важно.
// Потому что TS по сути не знает, кнопка мы или ссылка. А у них между прочим
// разные пропсы и HTMLButtonElement/HTMLAnchorElement!!!
// Поэтому тащим пока по базе.
export const Button = (props: ButtonProps) => {
  const {
    variant = 'fill',
    size = 'M',
    className = '',
    children,
  } = props;

  const buttonClasses = [
    styles.button,
    styles[`variant-${variant}`],
    styles[`size-${size}`],
    className,
  ].filter(Boolean).join(' ');

  // Сужаем по нормальному. Мы не могли передать as раньше, потому что у него тогда
  // был бы юнион-тип и TS бы заплакал: все пропсы были бы в юнионе, а не привязаны
  // к конкретному типу. 
  // А так раз поле as объекта props равно 'a', значит весь props — это AsLinkProps.
  if (props.as === 'a') {
    const { as, ref, ...rest } = props;

    return (
      <a ref={ref} className={buttonClasses} {...rest}>
        {children}
      </a>
    );
  }

  // Избегаем ситуации, когда в формах кнопка отправляет форму. Делаем дефолт тип
  // Чтобы для submit разработчик переопределял уже самостоятельно.
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