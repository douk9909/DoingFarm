'use client';
import SignupForm from './SignupForm';
import styles from './signup.module.css';
import signupBg from '@/assets/backgroundImg/signup_bg.svg';

export default function SignupPage() {
  return (
    <div className={styles.container} style={{ backgroundImage: `url(${signupBg.src})` }}>
      <section className={styles.formSection}>
        <SignupForm />
      </section>
    </div>
  );
}
