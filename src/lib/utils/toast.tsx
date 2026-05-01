import toast, { ToastOptions } from 'react-hot-toast';

import ToastSuccessIcon from '@/assets/icons/ToastSuccessIcon';
import ToastErrorIcon from '@/assets/icons/ToastErrorIcon';

const DEFAULT_OPTIONS: ToastOptions = {
  duration: 3000,
  id: 'unique-toast',
  className: 'custom-toast',
};

type OpenToast = {
  (message: string): string;
  success: (message: string) => string;
  error: (message: string) => string;
};

export const showToast = ((message: string, options?: ToastOptions) => {
  return toast(message, {
    ...DEFAULT_OPTIONS,
    icon: null,
    className: `toast ${options?.className || ''}`,
  });
}) as OpenToast;

showToast.success = (message: string, options?: ToastOptions) => {
  return toast.success(message, {
    ...DEFAULT_OPTIONS,
    icon: <ToastSuccessIcon size={20} />,
    className: `toast toast-success ${options?.className || ''}`,
  });
};

showToast.error = (message: string, options?: ToastOptions) => {
  return toast.error(message, {
    ...DEFAULT_OPTIONS,
    icon: <ToastErrorIcon size={20} />,
    className: `toast toast-error ${options?.className || ''}`,
  });
};
