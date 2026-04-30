export const TOKEN_KEY = 'accessToken';
const TOKEN_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

export const getToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(TOKEN_KEY);
};

export const setToken = (token: string): void => {
  if (typeof window === 'undefined') return;

  localStorage.setItem(TOKEN_KEY, token);
  document.cookie = `${TOKEN_KEY}=${token}; path=/; max-age=${TOKEN_MAX_AGE_SECONDS}; samesite=lax`;
};

export const removeToken = (): void => {
  if (typeof window === 'undefined') return;

  localStorage.removeItem(TOKEN_KEY);
  document.cookie = `${TOKEN_KEY}=; path=/; max-age=0; samesite=lax`;
};
