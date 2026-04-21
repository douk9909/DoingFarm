'use client';
import LoginForm from '@/components/auth/LoginForm';
import styles from './login.module.css';

export default function LoginPage() {
  return (
    <div className={styles.container}>
      <main className={styles.mainContent}>
        <section className={styles.formSection}>
          <LoginForm />
        </section>

        <section className={styles.illustrationSection}>
          <div className={styles.placeholderBox} />
        </section>
      </main>
    </div>
  );
}
