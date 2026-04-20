import { ComponentType, InputHTMLAttributes, forwardRef, useId } from 'react';
import styles from './Input.module.css';
import { cn } from '@/lib/utils/cn';

type IconType = ComponentType<{ size?: number }>;

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  element: 'input' | 'textarea';
  leftIcon?: IconType;
  rightIcon?: IconType;
  onRightIconClick?: () => void;
  label?: string;
  status?: 'default' | 'error' | 'disabled';
  isDisabled?: boolean;
  errorMsg?: string;
  rows?: number;
}

export const Input = forwardRef<HTMLInputElement | HTMLTextAreaElement, InputProps>(function Input(
  {
    element,
    leftIcon: LeftIcon,
    rightIcon: RightIcon,
    onRightIconClick,
    label,
    status = 'default',
    isDisabled = false,
    errorMsg,
    rows = 4,
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
        {element === 'input' ? (
          <input id={id} className={styles.inputStyle} {...props} ref={ref} disabled={isDisabled} />
        ) : (
          <textarea
            id={id}
            className={cn(styles.textareaStyle, styles.inputStyle)}
            rows={rows}
            {...props}
            ref={ref}
            disabled={isDisabled}
          />
        )}

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
