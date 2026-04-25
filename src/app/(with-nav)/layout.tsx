import { cookies } from 'next/headers';
import { WithNavLayoutClient } from './_components/WithNavLayoutClient';
import {
  SIDEBAR_VIEWPORT_COOKIE_NAME,
  SIDEBAR_WIDTH_COOKIE_NAME,
  getDefaultSidebarWidth,
  parseSidebarViewportMode,
  parseSidebarWidth,
} from './_lib/sidebarWidth';

interface WithNavLayoutProps {
  children: React.ReactNode;
}

export default async function WithNavLayout({ children }: WithNavLayoutProps) {
  const cookieStore = await cookies();

  // 쿠키 복원
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
  return (
    <WithNavLayoutClient initialSidebarWidth={initialSidebarWidth}>
      {children}
    </WithNavLayoutClient>
  );
}
