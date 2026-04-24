'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/layout/navbar/Navbar';
import Sidebar from '@/components/layout/sidebar/Sidebar';
import styles from '../layout.module.css';
import {
  SIDEBAR_VIEWPORT_COOKIE_NAME,
  SIDEBAR_WIDTH_COOKIE_NAME,
  type ViewportMode,
  clampSidebarWidth,
  getViewportMode,
} from '../_lib/sidebarWidth';

interface WithNavLayoutClientProps {
  children: React.ReactNode;
  initialSidebarWidth: number | null;
}

// Cookie 저장
function writeCookie(name: string, value: string) {
  document.cookie = `${name}=${value}; path=/; max-age=31536000; samesite=lax`;
}

// With-nav 셸
export function WithNavLayoutClient({
  children,
  initialSidebarWidth,
}: WithNavLayoutClientProps) {
  // 초기 폭
  const [sidebarWidth, setSidebarWidth] = useState<number | null>(initialSidebarWidth);
  const [viewportMode, setViewportMode] = useState<ViewportMode>('mobile');
  const [isResizing, setIsResizing] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

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

      // 모바일 닫힘
      setIsMobileSidebarOpen(false);

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
    // 스크롤 잠금
    if (viewportMode !== 'mobile' || !isMobileSidebarOpen) {
      document.body.style.overflow = '';
      return;
    }

    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileSidebarOpen, viewportMode]);

  useEffect(() => {
    if (viewportMode !== 'mobile' || !isMobileSidebarOpen) {
      return;
    }

    // Esc 닫힘
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMobileSidebarOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMobileSidebarOpen, viewportMode]);

  useEffect(() => {
    if (!isResizing) {
      return;
    }

    // 드래그 폭
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
      <Sidebar
        isMobileOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />
      <div
        className={styles.resizeHandle}
        role="presentation"
        onMouseDown={() => setIsResizing(true)}
      />
      <div className={styles.contentArea}>
        <Navbar
          isMobileSidebarOpen={isMobileSidebarOpen}
          onOpenMobileSidebar={() => setIsMobileSidebarOpen(true)}
        />
        <main className={styles.main}>{children}</main>
      </div>
      <button
        type="button"
        aria-label="사이드바 닫기"
        className={`${styles.mobileOverlay} ${
          isMobileSidebarOpen ? styles.mobileOverlayVisible : ''
        }`}
        onClick={() => setIsMobileSidebarOpen(false)}
      />
    </div>
  );
}
