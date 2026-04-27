import { TextareaHTMLAttributes, forwardRef, useId } from 'react';
import BaseInputField, { BaseInputFieldProps } from './BaseInputField';
import { cn } from '@/lib/utils/cn';
import styles from './TextInput.module.css';

interface TextAreaProps
  extends
    Omit<BaseInputFieldProps, 'children'>,
    Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'id'> {
  rows?: number;
}

export const TextAreaInput = forwardRef<HTMLTextAreaElement, TextAreaProps>(function TextAreaInput(
  {
    label,
    status = 'default',
    isDisabled = false,
    errorMsg,
    rows = 4,
    className,
    ...props
  }: TextAreaProps,
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

export default TextAreaInput;
