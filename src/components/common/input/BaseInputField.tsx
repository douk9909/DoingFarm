import { ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';
import styles from './Input.module.css';

export interface BaseInputFieldProps {
  id?: string;
  label?: string;
  status?: 'default' | 'error';
  isDisabled?: boolean;
  errorMsg?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  onRightIconClick?: () => void;
  children: ReactNode;
}

export default function BaseInputField({
  id,
  label,
  status = 'default',
  isDisabled = false,
  errorMsg,
  leftIcon,
  rightIcon,
  onRightIconClick,
  children,
}: BaseInputFieldProps) {
  return (
    <div className={styles.wrapper}>
      {label && (
        <label htmlFor={id} className={styles.labelStyle}>
          {label}
        </label>
      )}
      <div className={cn(styles.inputContainer, styles[status], isDisabled && styles.disabled)}>
        {leftIcon && <div className={styles.iconWrapper}>{leftIcon}</div>}
        {children}
        {rightIcon && (
          <button
            type="button"
            className={cn(styles.iconWrapper, styles.clickableIcon)}
            onClick={onRightIconClick}
          >
            {rightIcon}
          </button>
        )}
      </div>
      {status === 'error' && errorMsg && <p className={styles.errorMsg}>{errorMsg}</p>}
    </div>
  );
}
