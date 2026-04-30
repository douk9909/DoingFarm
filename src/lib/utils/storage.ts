export const TOKEN_KEY = 'accessToken';
const TOKEN_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

export const getToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(TOKEN_KEY);
};

export const setToken = (token: string): void => {
  if (typeof window === 'undefined') return;

  localStorage.setItem(TOKEN_KEY, token);
  // 서버 컴포넌트에서도 토큰을 읽어야 해서 쿠키에도 같이 저장
  document.cookie = `${TOKEN_KEY}=${token}; path=/; max-age=${TOKEN_MAX_AGE_SECONDS}; samesite=lax`;
};

export const removeToken = (): void => {
  if (typeof window === 'undefined') return;

  localStorage.removeItem(TOKEN_KEY);
  // 인증이 풀릴 때 서버에서 읽는 쿠키도 같이 정리
  document.cookie = `${TOKEN_KEY}=; path=/; max-age=0; samesite=lax`;
};
