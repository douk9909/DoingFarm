import { TextareaHTMLAttributes, forwardRef } from 'react';
import { BaseInputField, BaseInputFieldProps } from '@/components/common/input/BaseInputField';
import { cn } from '@/lib/utils/cn';
import styles from './Input.module.css';

interface TextareaProps
  extends Omit<BaseInputFieldProps, 'children'>, TextareaHTMLAttributes<HTMLTextAreaElement> {
  rows?: number;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { status = 'default', isDisabled = false, rows = 4, ...props }: TextareaProps,
  ref,
) {
  return (
    <BaseInputField status={status} isDisabled={isDisabled}>
      <textarea
        className={cn(styles.inputStyle, styles.textareaStyle)}
        ref={ref}
        disabled={isDisabled}
        rows={rows}
        {...props}
      />
    </BaseInputField>
  );
});
