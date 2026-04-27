'use client';
import Link from 'next/link';
import styles from './LoginForm.module.css';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import logo from '@/assets/logo/login_logo.svg';
import visibilityOn from '@/assets/icon/visibility_on.svg';
import visibilityOff from '@/assets/icon/visibility_off.svg';
import Input from '@/components/common/input';
import Button from '@/components/common/button/Button';
import { authApi } from '@/lib/api/auth';
import { setToken } from '@/lib/utils/storage';

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const isValid = email !== '' && password !== '' && !emailError && !passwordError;

  const validateEmail = (value: string) => {
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    setEmailError(isValid || value === '' ? '' : '이메일 형식으로 작성해 주세요');
  };

  const validatePassword = (value: string) => {
    setPasswordError(value.length >= 8 || value === '' ? '' : '8자 이상 작성해 주세요.');
  };

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
      onSubmit={async (e) => {
        e.preventDefault();
        try {
          const res = await authApi.login({ email, password });
          setToken(res.data.accessToken);
          router.push('/mydashboard');
        } catch (error) {
          const message = error instanceof Error ? error.message : '로그인에 실패했습니다.';

          if (message.includes('이메일')) {
            setEmailError(message);
          } else if (message.includes('비밀번호')) {
            setPasswordError(message);
          } else {
            setEmailError(message);
          }
        }
      }}
    >
      <Link href="/" className={styles.logoWrapper}>
        <Image src={logo} alt="Do!ngFarm 로고" width={331} height={154} priority />
      </Link>

      <div className={styles.inputGroup}>
        <Input.Text
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
        <Input.Text
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

      <Button
        type="submit"
        size="lg"
        fullWidth
        className={styles.submitButton}
        disabled={!isValid}
        useDisabledOpacity={false}
      >
        로그인
      </Button>

      <p className={styles.signupLink}>
        회원이 아니신가요? <Link href="/signup">회원가입하기</Link>
      </p>
    </form>
  );
}
