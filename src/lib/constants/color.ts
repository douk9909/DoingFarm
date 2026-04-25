export const DASHBOARD_COLORS = [
  'var(--color-profile-rose)',
  'var(--color-profile-orange)',
  'var(--color-profile-yellow)',
  'var(--color-profile-green)',
  'var(--color-profile-cobalt)',
  'var(--color-profile-violet)',
] as const;

export type DashboardColor = (typeof DASHBOARD_COLORS)[number];
