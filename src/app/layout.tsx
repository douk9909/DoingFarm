import type { Metadata } from 'next';
import './globals.css';
import '@/styles/tokens.css';

export const metadata: Metadata = {
  title: 'Taskify',
  description: 'Taskify project',
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ko">
      <body>
      </body>
    </html>
  );
}