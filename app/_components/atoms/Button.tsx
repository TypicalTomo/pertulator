import { type NavigationLink } from '@/app/_types/NavigationLink';
import { twMerge } from 'tailwind-merge';
import { Icon } from '@iconify/react';
import Link from 'next/link';

export interface Props extends NavigationLink {
  iconOnly?: boolean;
  target?: string;
  rel?: string;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'default' | 'primary' | 'inverted' | 'dark';
  size?: 'small' | 'medium' | 'large';
  class?: string;
}

const Button = ({
  text,
  href,
  ariaLabel,
  icon,
  iconOnly,
  target,
  rel,
  type,
  variant,
  size,
  class: className,
}: Props) => {
  const buttonBaseClasses =
    'text-nowrap inline-flex flex-nowrap items-center justify-center gap-3 uppercase font-bold tracking-wider transition duration-300 ease-in-out';

  const buttonVariantClasses = {
    default: 'bg-background-highlighted text-foreground border-2 border-foreground-highlighted',
    primary: 'bg-primary text-white border-2 border-primary',
    inverted: 'bg-background-inverted text-foreground-inverted border-2 border-background-inverted',
    dark: 'bg-darker text-lightest border-2 border-darker',
  };

  const buttonSizeClasses = {
    small: 'py-2 px-4 text-sm',
    medium: 'py-3 px-6 text-md',
    large: 'py-4 px-8 text-lg',
  };

  const buttonClasses = twMerge(
    buttonBaseClasses,
    buttonVariantClasses[variant || 'default'],
    buttonSizeClasses[size || 'medium'],
    className
  );

  if (href) {
    return (
      <Link className={buttonClasses} href={href} aria-label={ariaLabel} target={target} rel={rel}>
        {icon && <Icon icon={icon} />}
        {text && <span>{text}</span>}
      </Link>
    );
  }

  return (
    <button type={type} className={buttonClasses}>
      {icon && <Icon icon={icon} />}
      {text && <span>{text}</span>}
    </button>
  );
};

export default Button;
