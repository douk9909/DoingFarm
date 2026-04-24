import { cookies } from 'next/headers';
import WithNavShell from './WithNavShell';
import {
  SIDEBAR_VIEWPORT_COOKIE_NAME,
  SIDEBAR_WIDTH_COOKIE_NAME,
  getDefaultSidebarWidth,
  parseSidebarViewportMode,
  parseSidebarWidth,
} from './sidebarWidth';

interface WithNavLayoutProps {
  children: React.ReactNode;
}

// 서버 초기 폭 계산
export default async function WithNavLayout({ children }: WithNavLayoutProps) {
  // 쿠키 복원
  const cookieStore = await cookies();
  const savedViewportMode = parseSidebarViewportMode(
    cookieStore.get(SIDEBAR_VIEWPORT_COOKIE_NAME)?.value,
  );
  const savedSidebarWidth = parseSidebarWidth(cookieStore.get(SIDEBAR_WIDTH_COOKIE_NAME)?.value);

  // 첫 렌더 폭 결정
  const initialSidebarWidth =
    savedViewportMode === 'mobile'
      ? null
      : savedSidebarWidth ?? getDefaultSidebarWidth(savedViewportMode);

  // 클라이언트 셸 연결
  return <WithNavShell initialSidebarWidth={initialSidebarWidth}>{children}</WithNavShell>;
}
