import { Toaster } from 'react-hot-toast';
import styles from './layout.module.css';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <main>
      {children}
      <Toaster
        position="bottom-center"
        toastOptions={{
          success: {
            className: styles.toast,
            style: {
              background: 'var(--color-primary-500)',
              boxShadow: 'var(--shadow-md)',
              padding: '7px 10px 7px 20px',
              gap: '8px',
              borderRadius: '30px',
              color: 'var(--color-white)',
              font: 'var(--text-xl-medium)',
            },
          },
        }}
      />
    </main>
  );
}
