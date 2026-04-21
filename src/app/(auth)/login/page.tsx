'use client';
import LoginForm from './LoginForm';
import styles from './login.module.css';
import Image from 'next/image';
import loginBg from '@/assets/backgroundImg/login_bg.svg';
import loginIllust from '@/assets/backgroundImg/login.svg';

export default function LoginPage() {
  return (
    <div className={styles.container} style={{ backgroundImage: `url(${loginBg.src})` }}>
      <main className={styles.mainContent}>
        <section className={styles.formSection}>
          <LoginForm />
        </section>

        <section className={styles.illustrationSection}>
          <Image src={loginIllust} alt="로그인 일러스트" width={823} height={823} />
        </section>
      </main>
    </div>
  );
}
