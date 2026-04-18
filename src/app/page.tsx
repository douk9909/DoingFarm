import Link from 'next/link';
import { PATH } from '@/lib/constants/path';

export default function LandingPage() {
  return (
    <main style={{ padding: '40px' }}>
      <h1>Do!ngFarm</h1>
      <p>Do!ngFarm</p>

      <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
        <Link href={PATH.LOGIN}>로그인</Link>
        <Link href={PATH.SIGNUP}>회원가입</Link>
      </div>
    </main>
  );
}