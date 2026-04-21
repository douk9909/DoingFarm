import { ComponentType, ReactNode, useId } from 'react';
import { cn } from '@/lib/utils/cn';
import styles from './Input.module.css';

export interface BaseInputFieldProps {
  label?: string;
  id?: string;
  status?: 'default' | 'error' | 'disabled';
  isDisabled?: boolean;
  errorMsg?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  onRightIconClick?: () => void;
  children: ReactNode;
}

export function BaseInputField({
  label,
  id,
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
      <div
        className={cn(styles.inputContainer, isDisabled ? styles.disabled : styles[status])}
        data-status={isDisabled ? 'disabled' : status}
      >
        {leftIcon && <div className={styles.iconWrapper}>{leftIcon}</div>}
        {children}
        {rightIcon && (
          <button
            type="button"
            className={styles.iconWrapper}
            data-clickable={!!onRightIconClick}
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
