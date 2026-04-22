import Link from 'next/link';
import { PATH } from '@/lib/constants/path';
import styles from './page.module.css';
import Navbar from '@/components/layout/navbar/Navbar';

export default function LandingPage() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <p className={styles.eyebrow}>Project Setup</p>

        <Navbar />

        <section className={styles.intro}>
          <h1>Do!ngFarm</h1>
          <p>
            Next.js 기반 초기 셋업입니다. <br></br>
            인증 진입점과 기본 라우팅 구조를 먼저 정리해 두었습니다.
          </p>
        </section>

        <div className={styles.ctas}>
          <Link href={PATH.LOGIN} className={styles.primary}>
            로그인
          </Link>
          <Link href={PATH.SIGNUP} className={styles.secondary}>
            회원가입
          </Link>
        </div>
      </main>
    </div>
  );
}
