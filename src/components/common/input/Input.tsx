import { InputHTMLAttributes, forwardRef, useId } from 'react';
import BaseInputField, { BaseInputFieldProps } from './BaseInputField';
import { cn } from '@/lib/utils/cn';
import styles from './Input.module.css';

interface InputProps
  extends
    Omit<BaseInputFieldProps, 'children'>,
    Omit<InputHTMLAttributes<HTMLInputElement>, 'id'> {}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    type = 'text',
    label,
    status = 'default',
    isDisabled = false,
    errorMsg,
    leftIcon,
    rightIcon,
    onRightIconClick,
    className,
    ...props
  }: InputProps,
  ref,
) {
  const generatedId = useId();
  const id = props.id ?? generatedId;

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
      <input
        {...props}
        type={type}
        id={id}
        className={cn(styles.inputStyle, className)}
        ref={ref}
        disabled={isDisabled}
      />
    </BaseInputField>
  );
});
