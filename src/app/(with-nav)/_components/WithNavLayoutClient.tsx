'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/layout/navbar/Navbar';
import Sidebar from '@/components/layout/sidebar/Sidebar';
import { DashboardCreateModalProvider } from '@/components/dashboard/create/DashboardCreateModalProvider';
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

// 쿠키 저장
function setSidebarCookie(name: string, value: string) {
  document.cookie = `${name}=${value}; path=/; max-age=31536000; samesite=lax`;
}

// With-nav 클라이언트 셸
export function WithNavLayoutClient({ children, initialSidebarWidth }: WithNavLayoutClientProps) {
  // 초기 폭
  const [sidebarWidth, setSidebarWidth] = useState<number | null>(initialSidebarWidth);
  const [viewportMode, setViewportMode] = useState<ViewportMode>('mobile');
  const [isSidebarResizing, setIsSidebarResizing] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  useEffect(() => {
    // 뷰포트 동기화
    const updateViewportMode = () => {
      const nextViewportMode = getViewportMode(window.innerWidth);
      setViewportMode(nextViewportMode);

      // 뷰포트 저장
      setSidebarCookie(SIDEBAR_VIEWPORT_COOKIE_NAME, nextViewportMode);

      if (nextViewportMode === 'mobile') {
        return;
      }

      // 모바일 드로어 닫힘
      setIsMobileSidebarOpen(false);

      // 저장 폭 유지
      setSidebarWidth((currentSidebarWidth) =>
        currentSidebarWidth === null ? null : clampSidebarWidth(currentSidebarWidth),
      );
    };

    updateViewportMode();
    window.addEventListener('resize', updateViewportMode);

    return () => {
      window.removeEventListener('resize', updateViewportMode);
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
    const closeMobileSidebarOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMobileSidebarOpen(false);
      }
    };

    window.addEventListener('keydown', closeMobileSidebarOnEscape);

    return () => {
      window.removeEventListener('keydown', closeMobileSidebarOnEscape);
    };
  }, [isMobileSidebarOpen, viewportMode]);

  useEffect(() => {
    if (!isSidebarResizing) {
      return;
    }

    // 리사이즈 반영
    const handleSidebarResize = (event: MouseEvent) => {
      const nextSidebarWidth = clampSidebarWidth(event.clientX);
      setSidebarWidth(nextSidebarWidth);

      // 폭 저장
      setSidebarCookie(SIDEBAR_WIDTH_COOKIE_NAME, String(nextSidebarWidth));
    };

    const finishSidebarResize = () => {
      setIsSidebarResizing(false);
    };

    window.addEventListener('mousemove', handleSidebarResize);
    window.addEventListener('mouseup', finishSidebarResize);

    return () => {
      window.removeEventListener('mousemove', handleSidebarResize);
      window.removeEventListener('mouseup', finishSidebarResize);
    };
  }, [isSidebarResizing]);

  return (
    <DashboardCreateModalProvider>
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
          onMouseDown={() => setIsSidebarResizing(true)}
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
    </DashboardCreateModalProvider>
  );
}
