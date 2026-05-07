export const DASHBOARD_COLORS = [
  'var(--color-profile-rose)',
  'var(--color-profile-orange)',
  'var(--color-profile-yellow)',
  'var(--color-profile-green)',
  'var(--color-profile-cobalt)',
  'var(--color-profile-violet)',
] as const;

export type DashboardColor = (typeof DASHBOARD_COLORS)[number];
// 화면에서는 CSS 토큰을 쓰고 API 요청에는 Hex 값을 사용
export const DASHBOARD_COLOR_HEX_MAP: Record<DashboardColor, string> = {
  'var(--color-profile-rose)': '#ae2e24',
  'var(--color-profile-orange)': '#e56c00',
  'var(--color-profile-yellow)': '#bd8c00',
  'var(--color-profile-green)': '#206e4e',
  'var(--color-profile-cobalt)': '#1458bc',
  'var(--color-profile-violet)': '#593ea5',
};

export const TODO_TAG_COLORS = [
  'var(--color-profile-green)',
  'var(--color-profile-violet)',
  'var(--color-profile-cyan)',
  'var(--color-profile-rose)',
  'var(--color-profile-cobalt)',
  'var(--color-profile-yellow)',
  'var(--color-profile-orange)',
] as const;

export const getColorByName = (name: string, colors: readonly string[]) => {
  const trimmed = name.trim();

  const index =
    Array.from(trimmed).reduce((sum, char) => sum + char.charCodeAt(0), 0) % colors.length;

  return colors[index];
};
