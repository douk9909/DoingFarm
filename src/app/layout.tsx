import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import '@/styles/global.css';

export const metadata: Metadata = {
  title: 'Do!ngFarm',
  description: 'Do!ngFarm project',
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
