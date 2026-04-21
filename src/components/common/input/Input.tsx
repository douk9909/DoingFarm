import { InputHTMLAttributes, forwardRef, useId } from 'react';
import { BaseInputField, BaseInputFieldProps } from '@/components/common/input/BaseInputField';

import styles from './Input.module.css';

interface InputProps
  extends Omit<BaseInputFieldProps, 'children'>, InputHTMLAttributes<HTMLInputElement> {}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    label,
    status = 'default',
    isDisabled = false,
    errorMsg,
    leftIcon,
    rightIcon,
    onRightIconClick,
    ...props
  }: InputProps,
  ref,
) {
  const id = useId();
  return (
    <BaseInputField
      label={label}
      id={id}
      status={status}
      isDisabled={isDisabled}
      errorMsg={errorMsg}
      leftIcon={leftIcon}
      rightIcon={rightIcon}
      onRightIconClick={onRightIconClick}
    >
      <input id={id} className={styles.inputStyle} ref={ref} disabled={isDisabled} {...props} />
    </BaseInputField>
  );
});
