import { ComponentType, InputHTMLAttributes, forwardRef } from 'react';
import styles from './Input.module.css';
import { cn } from '@/lib/utils/cn';

type IconType = ComponentType<{ size?: number; color?: string }>;

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  leftIcon?: IconType;
  rightIcon?: IconType;
  onRightClick?: () => void;

  limit?: number;
  errorMsg?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { leftIcon: LeftIcon, rightIcon: RightIcon, onRightClick, limit, errorMsg, ...props }: InputProps,
  ref,
) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.inputContainer}>
        {LeftIcon && (
          <div className={styles.iconWrapper}>
            <LeftIcon size={20} />
          </div>
        )}
        <input className={styles.inputStyle} {...props} ref={ref} />
        {RightIcon && (
          <div className={styles.iconWrapper} onClick={onRightClick}>
            <RightIcon size={24} />
          </div>
        )}
      </div>
      {errorMsg && <p className={styles.errorMsg}>{errorMsg}</p>}
    </div>
  );
});
