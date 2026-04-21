'use client';
import Link from 'next/link';
import styles from './LoginForm.module.css';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const validateEmail = (value: string) => {
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    setEmailError(isValid || value === '' ? '' : '이메일 형식으로 작성해 주세요');
  };

  return (
    <form
      className={styles.form}
      onSubmit={(e) => {
        e.preventDefault();
        router.push('/mydashboard');
      }}
    >
      <Link href="/" className={styles.logoWrapper}>
        <h2>Do!ngFarm</h2>
      </Link>

      <div className={styles.inputGroup}>
        <label htmlFor="email">이메일</label>
        <input
          id="email"
          type="email"
          placeholder="이메일을 입력하세요"
          className={`${styles.inputField} ${emailError ? styles.inputError : ''}`}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => validateEmail(email)}
        />
        {emailError && <p className={styles.errorMessage}>{emailError}</p>}
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="password">비밀번호</label>
        <div className={styles.passwordWrapper}>
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="8자 이상 입력해주세요"
            className={styles.inputField}
          />
          <button
            type="button"
            className={styles.eyeButton}
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? '감은 눈' : '뜬 눈'}
          </button>
        </div>
      </div>

      <button type="submit" className={styles.submitButton}>
        로그인
      </button>

      <p className={styles.signupLink}>
        회원이 아니신가요? <Link href="/signup">회원가입하기</Link>
      </p>
    </form>
  );
}
