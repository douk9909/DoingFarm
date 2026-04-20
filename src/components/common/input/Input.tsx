import { ComponentType, InputHTMLAttributes, forwardRef, useId } from 'react';
import styles from './Input.module.css';
import { cn } from '@/lib/utils/cn';

type IconType = ComponentType<{ size?: number; color?: string }>;

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  leftIcon?: IconType;
  rightIcon?: IconType;
  onRightIconClick?: () => void;
  label?: string;
  status?: 'default' | 'error' | 'disabled';
  isDisabled?: boolean;
  errorMsg?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    leftIcon: LeftIcon,
    rightIcon: RightIcon,
    onRightIconClick,
    label,
    status = 'default',
    isDisabled = false,
    errorMsg,
    ...props
  }: InputProps,
  ref,
) {
  const id = useId();

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
        {LeftIcon && (
          <div className={styles.iconWrapper}>
            <LeftIcon size={20} />
          </div>
        )}
        <input id={id} className={styles.inputStyle} {...props} ref={ref} disabled={isDisabled} />
        {RightIcon && (
          <div
            className={styles.iconWrapper}
            data-clickable={!!onRightIconClick}
            onClick={onRightIconClick}
          >
            <RightIcon size={24} />
          </div>
        )}
      </div>
      {status === 'error' && errorMsg && <p className={styles.errorMsg}>{errorMsg}</p>}
    </div>
  );
});
