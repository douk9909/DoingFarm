import Link from 'next/link';
import { PATH } from '@/lib/constants/path';

export default function LandingPage() {
  return (
    <main>
      <h1>Do!ngFarm</h1>
      <p>Do!ngFarm</p>

      <div>
        <Link href={PATH.LOGIN}>로그인</Link>
        <Link href={PATH.SIGNUP}>회원가입</Link>
      </div>
    </main>
  );
}