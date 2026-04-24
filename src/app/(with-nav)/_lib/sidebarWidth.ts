export type ViewportMode = 'mobile' | 'tablet' | 'pc';

export const SIDEBAR_WIDTH_COOKIE_NAME = 'doingfarm-sidebar-width';
export const SIDEBAR_VIEWPORT_COOKIE_NAME = 'doingfarm-sidebar-viewport';

export const SIDEBAR_TABLET_WIDTH = 280;
export const SIDEBAR_PC_WIDTH = 600;
export const SIDEBAR_MIN_WIDTH = SIDEBAR_TABLET_WIDTH;
export const SIDEBAR_MAX_WIDTH = SIDEBAR_PC_WIDTH;

// 뷰포트 판별
export function getViewportMode(windowWidth: number): ViewportMode {
  if (windowWidth >= 1200) {
    return 'pc';
  }

  if (windowWidth >= 768) {
    return 'tablet';
  }

  return 'mobile';
}

// 기본 폭 계산
export function getDefaultSidebarWidth(viewportMode: ViewportMode) {
  if (viewportMode === 'pc') {
    return SIDEBAR_PC_WIDTH;
  }

  if (viewportMode === 'tablet') {
    return SIDEBAR_TABLET_WIDTH;
  }

  return 0;
}

// 최소/최대 폭 제한
export function clampSidebarWidth(sidebarWidth: number) {
  return Math.min(SIDEBAR_MAX_WIDTH, Math.max(SIDEBAR_MIN_WIDTH, sidebarWidth));
}

// 저장 폭 파싱
export function parseSidebarWidth(savedWidth: string | undefined) {
  if (!savedWidth) {
    return null;
  }

  const parsedWidth = Number(savedWidth);

  if (Number.isNaN(parsedWidth)) {
    return null;
  }

  return clampSidebarWidth(parsedWidth);
}

// 저장 뷰포트 파싱
export function parseSidebarViewportMode(savedViewportMode: string | undefined): ViewportMode {
  if (
    savedViewportMode === 'mobile' ||
    savedViewportMode === 'tablet' ||
    savedViewportMode === 'pc'
  ) {
    return savedViewportMode;
  }

  return 'pc';
}
