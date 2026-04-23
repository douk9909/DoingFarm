'use client';
import SignupForm from './SignupForm';
import styles from './signup.module.css';
import Image from 'next/image';
import loginBg from '@/assets/backgroundImg/login_bg.svg';
import standingCarrot from '@/assets/character/standing_carrot.svg';

export default function SignupPage() {
  return (
    <div className={styles.container} style={{ backgroundImage: `url(${loginBg.src})` }}>
      <section className={styles.formSection}>
        <SignupForm />
      </section>

      <Image
        src={standingCarrot}
        alt="당근 캐릭터"
        width={397}
        height={397}
        className={styles.characterImg}
        priority
      />
    </div>
  );
}
