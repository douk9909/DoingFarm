import toast, { ToastOptions } from 'react-hot-toast';

import ToastSuccessIcon from '@/assets/icons/ToastSuccessIcon';
import ToastErrorIcon from '@/assets/icons/ToastErrorIcon';

const baseStyle = {
  borderRadius: '8px',
  fontSize: '14px',
  padding: '12px 16px',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
};

const DEFAULT_OPTIONS: ToastOptions = {
  duration: 3000,
  id: 'unique-toast',
  className: 'custom-toast',
  style: baseStyle,
};

type OpenToast = {
  (message: string): string;
  success: (message: string) => string;
  error: (message: string) => string;
};

export const showToast = ((message: string) => {
  return toast(message, {
    ...DEFAULT_OPTIONS,
    icon: null,
  });
}) as OpenToast;

showToast.success = (message: string) => {
  return toast.success(message, {
    ...DEFAULT_OPTIONS,
    icon: <ToastSuccessIcon />,
    style: {
      ...baseStyle,
      background: 'rgba(60, 179, 113, 1)',
    },
  });
};

showToast.error = (message: string) => {
  return toast.error(message, {
    ...DEFAULT_OPTIONS,
    icon: <ToastErrorIcon />,
    style: {
      ...baseStyle,
      background: 'rgba(255, 59, 48, 1)',
    },
  });
};
