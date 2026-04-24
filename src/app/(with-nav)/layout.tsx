'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/layout/navbar/Navbar';
import Sidebar from '@/components/layout/sidebar/Sidebar';
import styles from './layout.module.css';

interface WithNavLayoutProps {
  children: React.ReactNode;
}

const SIDEBAR_TABLET_WIDTH = 280;
const SIDEBAR_PC_WIDTH = 600;
const SIDEBAR_MIN_WIDTH = SIDEBAR_TABLET_WIDTH;
const SIDEBAR_MAX_WIDTH = SIDEBAR_PC_WIDTH;

function getSidebarDefaultWidth(windowWidth: number) {
  if (windowWidth >= 1200) {
    return SIDEBAR_PC_WIDTH;
  }

  if (windowWidth >= 768) {
    return SIDEBAR_TABLET_WIDTH;
  }

  return 0;
}

function getViewportMode(windowWidth: number) {
  if (windowWidth >= 1200) {
    return 'pc';
  }

  if (windowWidth >= 768) {
    return 'tablet';
  }

  return 'mobile';
}

export default function WithNavLayout({ children }: WithNavLayoutProps) {
  const [sidebarWidth, setSidebarWidth] = useState(SIDEBAR_PC_WIDTH);
  const [isResizing, setIsResizing] = useState(false);
  const [viewportMode, setViewportMode] = useState<'mobile' | 'tablet' | 'pc'>('pc');

  useEffect(() => {
    const applyDefaultSidebarWidth = () => {
      const nextViewportMode = getViewportMode(window.innerWidth);

      setViewportMode((currentViewportMode) => {
        if (currentViewportMode !== nextViewportMode) {
          setSidebarWidth(getSidebarDefaultWidth(window.innerWidth));
        }

        return nextViewportMode;
      });
    };

    applyDefaultSidebarWidth();
    window.addEventListener('resize', applyDefaultSidebarWidth);

    return () => {
      window.removeEventListener('resize', applyDefaultSidebarWidth);
    };
  }, []);

  useEffect(() => {
    if (!isResizing) {
      return;
    }

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
      style={{
        gridTemplateColumns:
          sidebarWidth > 0 ? `${sidebarWidth}px 8px minmax(0, 1fr)` : '0px 0px minmax(0, 1fr)',
      }}
    >
      <Sidebar />
      {sidebarWidth > 0 ? (
        <div
          className={styles.resizeHandle}
          role="presentation"
          onMouseDown={() => setIsResizing(true)}
        />
      ) : null}
      <div className={styles.contentArea}>
        <Navbar />
        <main className={styles.main}>{children}</main>
      </div>
    </div>
  );
}
