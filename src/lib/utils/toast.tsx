import toast, { ToastOptions } from 'react-hot-toast';

import ToastSuccessIcon from '@/assets/icons/ToastSuccessIcon';
import ToastErrorIcon from '@/assets/icons/ToastErrorIcon';

const DEFAULT_OPTIONS: ToastOptions = {
  duration: 3000,
  id: 'unique-toast',
  className: 'custom-toast',
};

type OpenToast = {
  (message: string, options?: ToastOptions): string;
  success: (message: string, options?: ToastOptions) => string;
  error: (message: string, options?: ToastOptions) => string;
};

export const showToast = ((message: string, options?: ToastOptions) => {
  return toast(message, {
    ...DEFAULT_OPTIONS,
    ...options,
    icon: null,
    className: `custom-toast ${options?.className || ''}`,
  });
}) as OpenToast;

showToast.success = (message: string, options?: ToastOptions) => {
  return toast.success(message, {
    ...DEFAULT_OPTIONS,
    ...options,
    icon: <ToastSuccessIcon size={20} />,
    className: `custom-toast toast-success ${options?.className || ''}`,
  });
};

showToast.error = (message: string, options?: ToastOptions) => {
  return toast.error(message, {
    ...DEFAULT_OPTIONS,
    ...options,
    icon: <ToastErrorIcon size={20} />,
    className: `custom-toast toast-error ${options?.className || ''}`,
  });
};
