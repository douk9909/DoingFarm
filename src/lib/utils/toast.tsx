// utils/toast.ts
import toast, { ToastOptions } from 'react-hot-toast';

import ToastSuccessIcon from '@/assets/icons/ToastSuccessIcon';
import ToastErrorIcon from '@/assets/icons/ToastErrorIcon';

const DEFAULT_OPTIONS: ToastOptions = {
  duration: 3000,
  className: 'custom-toast',
  style: {
    borderRadius: '8px',
    fontSize: '14px',
    padding: '12px 16px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
};

type ToastType = 'success' | 'error';

interface ShowToastParams {
  message: string;
  type?: ToastType;
  duration?: number;
}

export const showToast = ({ message, type = 'success', duration }: ShowToastParams) => {
  const options: ToastOptions = {
    ...DEFAULT_OPTIONS,
    duration: duration ?? DEFAULT_OPTIONS.duration,
  };

  const icon = type === 'success' ? <ToastSuccessIcon /> : <ToastErrorIcon />;

  toast.custom(
    (t) => (
      <div className={`custom-toast ${t.visible ? 'enter' : 'leave'}`}>
        {icon}
        <span>{message}</span>
      </div>
    ),
    options,
  );
};
