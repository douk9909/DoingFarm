import type { ButtonHTMLAttributes } from 'react';
import styles from './Button.module.css';
import { cn } from '@/lib/utils/cn';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  useDisabledOpacity?: boolean;
}

export default function Button({
  type = 'button',
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  useDisabledOpacity = true,
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={cn(
        styles.button,
        styles[variant],
        styles[size],
        fullWidth && styles.fullWidth,
        disabled && useDisabledOpacity && styles.disabledOpacity,
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
