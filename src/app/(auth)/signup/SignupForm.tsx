'use client';
import Link from 'next/link';
import styles from './SignupForm.module.css';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import logo from '@/assets/Do!ngFarm_logo.svg';
import visibilityOn from '@/assets/icon/visibility_on.svg';
import visibilityOff from '@/assets/icon/visibility_off.svg';
import checkEmpty from '@/assets/icon/check_empty.svg';
import checkActive from '@/assets/icon/check_active.svg';

export default function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [nickname, setNickname] = useState('');
  const [nicknameError, setNicknameError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [agreed, setAgreed] = useState<boolean>(false);

  const validateEmail = (value: string) => {
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    setEmailError(isValid || value === '' ? '' : '이메일 형식으로 작성해 주세요');
  };

  const validateNickname = (value: string) => {
    setNicknameError(value.length <= 10 || value === '' ? '' : '열 자 이하로 작성해주세요');
  };

  const validatePassword = (value: string) => {
    setPasswordError(value.length >= 8 || value === '' ? '' : '8자 이상 입력해주세요.');
  };

  const validateConfirmPassword = (value: string) => {
    setConfirmPasswordError(
      value === password || value === '' ? '' : '비밀번호가 일치하지 않습니다.',
    );
  };

  const isFormValid =
    email !== '' &&
    emailError === '' &&
    nickname !== '' &&
    nicknameError === '' &&
    password !== '' &&
    passwordError === '' &&
    confirmPassword !== '' &&
    confirmPasswordError === '' &&
    agreed;

  return (
    <form
      className={styles.form}
      onSubmit={(e) => {
        e.preventDefault();
        router.push('/mydashboard');
      }}
    >
      <Link href="/" className={styles.logoWrapper}>
        <Image src={logo} alt="Do!ngFarm 로고" width={331} height={154} priority />
      </Link>

      <div className={styles.inputGroup}>
        <label htmlFor="email">이메일</label>
        <input
          id="email"
          type="email"
          placeholder="이메일을 입력해 주세요"
          className={`${styles.inputField} ${emailError ? styles.inputError : ''}`}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => validateEmail(email)}
        />
        {emailError && <p className={styles.errorMessage}>{emailError}</p>}
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="nickname">닉네임</label>
        <div className={styles.nicknameWrapper}>
          <input
            id="nickname"
            type="nickname"
            placeholder="닉네임을 입력해 주세요"
            className={`${styles.inputField} ${nicknameError ? styles.inputError : ''}`}
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            onBlur={() => validateNickname(nickname)}
          />
        </div>
        {nicknameError && <p className={styles.errorMessage}>{nicknameError}</p>}
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="password">비밀번호</label>
        <div className={styles.passwordWrapper}>
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="8자 이상 입력해 주세요"
            className={`${styles.inputField} ${passwordError ? styles.inputError : ''}`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={() => validatePassword(password)}
          />
          <button
            type="button"
            className={styles.eyeButton}
            onClick={() => setShowPassword((prev) => !prev)}
          >
            <Image
              src={showPassword ? visibilityOn : visibilityOff}
              alt={showPassword ? '비밀번호 숨기기' : '비밀번호 보기'}
              width={24}
              height={24}
            />
          </button>
        </div>
        {passwordError && <p className={styles.errorMessage}>{passwordError}</p>}
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="password">비밀번호 확인</label>
        <div className={styles.passwordWrapper}>
          <input
            id="confirmPassword"
            type={showPassword ? 'text' : 'password'}
            placeholder="비밀번호를 한 번 더 입력해 주세요"
            className={`${styles.inputField} ${confirmPasswordError ? styles.inputError : ''}`}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            onBlur={() => validateConfirmPassword(confirmPassword)}
          />
          <button
            type="button"
            className={styles.eyeButton}
            onClick={() => setShowPassword((prev) => !prev)}
          >
            <Image
              src={showPassword ? visibilityOn : visibilityOff}
              alt={showPassword ? '비밀번호 숨기기' : '비밀번호 보기'}
              width={24}
              height={24}
            />
          </button>
        </div>
        {confirmPasswordError && <p className={styles.errorMessage}>{confirmPasswordError}</p>}
      </div>

      <div className={styles.agreeWrapper}>
        <button
          type="button"
          className={styles.agreeButton}
          onClick={() => setAgreed((prev) => !prev)}
          aria-pressed={agreed ? true : false}
        >
          <Image
            src={agreed ? checkActive : checkEmpty}
            alt={agreed ? '동의함' : '동의 안 함'}
            width={20}
            height={20}
          />
          이용약관에 동의합니다.
        </button>
      </div>

      <button type="submit" className={styles.submitButton} disabled={!isFormValid}>
        가입하기
      </button>

      <p className={styles.loginLink}>
        이미 회원이신가요? <Link href="/login">로그인하기</Link>
      </p>
    </form>
  );
}
