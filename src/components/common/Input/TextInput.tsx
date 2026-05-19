import { InputHTMLAttributes, forwardRef, useId } from 'react';
import BaseInputField, { BaseInputFieldProps } from './BaseInputField';
import { cn } from '@/lib/utils/cn';
import styles from './TextInput.module.css';

interface InputProps
  extends
    Omit<BaseInputFieldProps, 'children'>,
    Omit<InputHTMLAttributes<HTMLInputElement>, 'id'> {}

export const TextInput = forwardRef<HTMLInputElement, InputProps>(function TextInput(
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

export default TextInput;
