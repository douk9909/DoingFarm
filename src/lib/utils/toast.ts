import toast from 'react-hot-toast';

const DEFAULT_TOAST_OPTIONS = {
  duration: 3000,
  className: 'custom-toast',
  style: {
    borderRadius: '8px',
  },
};

interface ToastProps {
  message: string;
  type?: 'success' | 'error';
  duration?: number;
  icon?: React.ReactNode;
}

export function openToast({ message, type = 'success', duration = 3000 }: ToastProps) {
  const typeOption = {
    success: {
      icon: '✅',
      className: 'toast-success',
    },
    error: {
      icon: '❌',
      className: 'toast-error',
    },
  };

  return toast(message, {
    ...DEFAULT_TOAST_OPTIONS,
    ...typeOption[type],
    duration,
  });
}
