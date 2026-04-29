export const TODO_TAG_COLORS = [
  'var(--color-profile-green)',
  'var(--color-profile-violet)',
  'var(--color-profile-cyan)',
  'var(--color-profile-rose)',
  'var(--color-profile-cobalt)',
  'var(--color-profile-yellow)',
  'var(--color-profile-orange)',
] as const;

export const TODO_ASSIGNEE_COLORS = [
  'var(--color-profile-green)',
  'var(--color-profile-cobalt)',
  'var(--color-profile-orange)',
  'var(--color-profile-cyan)',
  'var(--color-profile-violet)',
] as const;

export const getRandomTodoTagColor = () =>
  TODO_TAG_COLORS[Math.floor(Math.random() * TODO_TAG_COLORS.length)];

export const getTodoAssigneeInitial = (nickname: string) => nickname.trim().charAt(0);
