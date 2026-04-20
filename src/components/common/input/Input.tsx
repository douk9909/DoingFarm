import { ComponentType, InputHTMLAttributes, forwardRef } from 'react';
import styles from './Input.module.css';
import { cn } from '@/lib/utils/cn';

type IconType = ComponentType<{ size?: number; color?: string }>;

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  leftIcon?: IconType;
  rightIcon?: IconType;
  onRightClick?: () => void;

  status?: 'default' | 'error' | 'disabled';
  isDisabled?: boolean;
  errorMsg?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    leftIcon: LeftIcon,
    rightIcon: RightIcon,
    onRightClick,
    errorMsg,
    status = 'default',
    isDisabled = false,
    ...props
  }: InputProps,
  ref,
) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.inputContainer} data-status={isDisabled ? 'disabled' : status}>
        {LeftIcon && (
          <div className={styles.iconWrapper}>
            <LeftIcon size={20} />
          </div>
        )}
        <input className={styles.inputStyle} {...props} ref={ref} disabled={isDisabled} />
        {RightIcon && (
          <div className={styles.iconWrapper} onClick={onRightClick}>
            <RightIcon size={24} />
          </div>
        )}
      </div>
      {status === 'error' && errorMsg && <p className={styles.errorMsg}>{errorMsg}</p>}
    </div>
  );
});
