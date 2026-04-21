'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/layout/navbar/Navbar';
import Sidebar from '@/components/layout/sidebar/Sidebar';
import styles from './layout.module.css';

interface WithNavLayoutProps {
  children: React.ReactNode;
}

const SIDEBAR_MIN_WIDTH = 88;
const SIDEBAR_MAX_WIDTH = 248;
const SIDEBAR_COLLAPSE_WIDTH = 112;

export default function WithNavLayout({ children }: WithNavLayoutProps) {
  const [sidebarWidth, setSidebarWidth] = useState(SIDEBAR_MAX_WIDTH);
  const [isResizing, setIsResizing] = useState(false);

  useEffect(() => {
    if (!isResizing) {
      return;
    }

    // 드래그 중에는 마우스 위치를 바로 폭으로 반영
    const handleMouseMove = (event: MouseEvent) => {
      const nextWidth = Math.min(
        SIDEBAR_MAX_WIDTH,
        Math.max(SIDEBAR_MIN_WIDTH, event.clientX),
      );

      setSidebarWidth(nextWidth);
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing]);

  return (
    <div
      className={styles.shell}
      style={{ gridTemplateColumns: `${sidebarWidth}px 8px minmax(0, 1fr)` }}
    >
      <Sidebar isCompact={sidebarWidth <= SIDEBAR_COLLAPSE_WIDTH} />
      <div
        className={styles.resizeHandle}
        role="presentation"
        // 경계선에서만 드래그가 시작되게 분리
        onMouseDown={() => setIsResizing(true)}
      />
      <div className={styles.contentArea}>
        <Navbar />
        <main className={styles.main}>{children}</main>
      </div>
    </div>
  );
}
