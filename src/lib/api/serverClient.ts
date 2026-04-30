import 'server-only';

import { cookies } from 'next/headers';
import { TOKEN_KEY } from '@/lib/utils/storage';

interface ServerApiRequestOptions extends RequestInit {
  params?: Record<string, string | number | undefined>;
}

function getServerApiUrl(path: string, params?: ServerApiRequestOptions['params']) {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  if (!baseUrl) {
    throw new Error('API 주소가 설정되어 있지 않습니다.');
  }

  const url = new URL(path, baseUrl);

  Object.entries(params ?? {}).forEach(([key, value]) => {
    if (value !== undefined) {
      url.searchParams.set(key, String(value));
    }
  });

  return url;
}

export async function serverApiRequest<T>(
  path: string,
  { params, headers, ...init }: ServerApiRequestOptions = {},
): Promise<T> {
  const token = (await cookies()).get(TOKEN_KEY)?.value;

  if (!token) {
    throw new Error('로그인이 필요합니다.');
  }

  // 서버 컴포넌트에서 먼저 데이터를 가져올 때 쿠키 토큰으로 인증 요청
  const response = await fetch(getServerApiUrl(path, params), {
    ...init,
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      ...headers,
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    const message =
      typeof errorData?.message === 'string'
        ? errorData.message
        : '데이터를 불러오지 못했습니다.';

    throw new Error(message);
  }

  return response.json() as Promise<T>;
}
