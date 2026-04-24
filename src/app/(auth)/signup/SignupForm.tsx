'use client';
import Link from 'next/link';
import styles from './SignupForm.module.css';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import logo from '@/assets/logo/login_logo.svg';
import visibilityOn from '@/assets/icon/visibility_on.svg';
import visibilityOff from '@/assets/icon/visibility_off.svg';
import checkEmpty from '@/assets/icon/check_empty.svg';
import checkActive from '@/assets/icon/check_active.svg';
import toast from 'react-hot-toast';
import { Input } from '@/components/common/input/Input';
import Button from '@/components/common/button/Button';

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

  const EyeIcon = (
    <Image
      src={showPassword ? visibilityOn : visibilityOff}
      alt={showPassword ? '비밀번호 숨기기' : '비밀번호 보기'}
      width={24}
      height={24}
    />
  );

  return (
    <form
      className={styles.form}
      onSubmit={(e) => {
        e.preventDefault();
        router.push('/login');
        toast.success('가입이 완료되었습니다.');
      }}
    >
      <Link href="/" className={styles.logoWrapper}>
        <Image src={logo} alt="Do!ngFarm 로고" width={331} height={154} priority />
      </Link>

      <div className={styles.inputGroup}>
        <Input
          type="email"
          label="이메일"
          placeholder="이메일을 입력해 주세요"
          status={emailError ? 'error' : 'default'}
          errorMsg={emailError}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => validateEmail(email)}
        />
      </div>

      <div className={styles.inputGroup}>
        <Input
          type="nickname"
          label="닉네임"
          placeholder="닉네임을 입력해 주세요"
          status={nicknameError ? 'error' : 'default'}
          errorMsg={nicknameError}
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          onBlur={() => validateNickname(nickname)}
        />
      </div>

      <div className={styles.inputGroup}>
        <Input
          type={showPassword ? 'text' : 'password'}
          label="비밀번호"
          placeholder="8자 이상 입력해 주세요"
          status={passwordError ? 'error' : 'default'}
          errorMsg={passwordError}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onBlur={() => validatePassword(password)}
          rightIcon={EyeIcon}
          onRightIconClick={() => setShowPassword((prev) => !prev)}
        />
      </div>

      <div className={styles.inputGroup}>
        <Input
          type={showPassword ? 'text' : 'password'}
          label="비밀번호 확인"
          placeholder="비밀번호를 한 번 더 입력해 주세요"
          status={confirmPasswordError ? 'error' : 'default'}
          errorMsg={confirmPasswordError}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          onBlur={() => validateConfirmPassword(confirmPassword)}
          rightIcon={EyeIcon}
          onRightIconClick={() => setShowPassword((prev) => !prev)}
        />
      </div>

      <div className={styles.agreeWrapper}>
        <button
          type="button"
          className={styles.agreeButton}
          onClick={() => setAgreed((prev) => !prev)}
          aria-pressed={agreed}
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

      <Button
        type="submit"
        size="lg"
        fullWidth
        className={styles.submitButton}
        disabled={!isFormValid}
        useDisabledOpacity={false}
      >
        가입하기
      </Button>

      <p className={styles.loginLink}>
        이미 회원이신가요? <Link href="/login">로그인하기</Link>
      </p>
    </form>
  );
}
