import { TextareaHTMLAttributes, forwardRef, useId } from 'react';
import BaseInputField, { BaseInputFieldProps } from './BaseInputField';
import { cn } from '@/lib/utils/cn';
import styles from './Input.module.css';

interface TextareaProps
  extends Omit<BaseInputFieldProps, 'children'>, TextareaHTMLAttributes<HTMLTextAreaElement> {
  rows?: number;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  {
    label,
    status = 'default',
    isDisabled = false,
    errorMsg,
    rows = 4,
    className,
    ...props
  }: TextareaProps,
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
    >
      <textarea
        {...props}
        id={id}
        className={cn(styles.inputStyle, styles.textareaStyle, className)}
        ref={ref}
        disabled={isDisabled}
        rows={rows}
      />
    </BaseInputField>
  );
});
