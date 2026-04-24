'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/layout/navbar/Navbar';
import Sidebar from '@/components/layout/sidebar/Sidebar';
import styles from '../layout.module.css';
import {
  SIDEBAR_MAX_WIDTH,
  SIDEBAR_MIN_WIDTH,
  SIDEBAR_VIEWPORT_COOKIE_NAME,
  SIDEBAR_WIDTH_COOKIE_NAME,
  type ViewportMode,
  clampSidebarWidth,
  getViewportMode,
} from '../_lib/sidebarWidth';

interface WithNavShellProps {
  children: React.ReactNode;
  initialSidebarWidth: number | null;
}

// 쿠키 저장
function writeCookie(name: string, value: string) {
  document.cookie = `${name}=${value}; path=/; max-age=31536000; samesite=lax`;
}

// 레이아웃 클라이언트 로직
export function WithNavLayoutClient({ children, initialSidebarWidth }: WithNavShellProps) {
  // 초기 폭 반영
  const [sidebarWidth, setSidebarWidth] = useState<number | null>(initialSidebarWidth);
  const [viewportMode, setViewportMode] = useState<ViewportMode>('mobile');
  const [isResizing, setIsResizing] = useState(false);

  useEffect(() => {
    // 뷰포트 동기화
    const syncViewportMode = () => {
      const nextViewportMode = getViewportMode(window.innerWidth);
      setViewportMode(nextViewportMode);

      // 뷰포트 저장
      writeCookie(SIDEBAR_VIEWPORT_COOKIE_NAME, nextViewportMode);

      if (nextViewportMode === 'mobile') {
        return;
      }

      // 저장 폭 유지
      setSidebarWidth((currentSidebarWidth) =>
        currentSidebarWidth === null ? null : clampSidebarWidth(currentSidebarWidth),
      );
    };

    syncViewportMode();
    window.addEventListener('resize', syncViewportMode);

    return () => {
      window.removeEventListener('resize', syncViewportMode);
    };
  }, []);

  useEffect(() => {
    if (!isResizing) {
      return;
    }

    // 드래그 폭 갱신
    const handleMouseMove = (event: MouseEvent) => {
      const nextSidebarWidth = clampSidebarWidth(event.clientX);
      setSidebarWidth(nextSidebarWidth);

      // 리사이즈 저장
      writeCookie(SIDEBAR_WIDTH_COOKIE_NAME, String(nextSidebarWidth));
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
      style={
        sidebarWidth === null || viewportMode === 'mobile'
          ? undefined
          : {
              gridTemplateColumns: `${sidebarWidth}px 8px minmax(0, 1fr)`,
            }
      }
    >
      <Sidebar />
      <div
        className={styles.resizeHandle}
        role="presentation"
        onMouseDown={() => setIsResizing(true)}
      />
      <div className={styles.contentArea}>
        <Navbar />
        <main className={styles.main}>{children}</main>
      </div>
    </div>
  );
}
