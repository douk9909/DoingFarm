'use client';
import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import ArrowLeftIcon from '@/assets/icons/ArrowLeftIcon';
import VisibilityOnIcon from '@/assets/icons/VisibilityOnIcon';
import VisibilityOffIcon from '@/assets/icons/VisibilityOffIcon';
import styles from './page.module.css';

// 목업 유저 데이터 (API 연동 후 삭제)
const mockUser = {
  email: 'johndoe@gmail.com',
  nickname: '배유철',
  profileImageUrl: null as string | null,
};

export default function MyPage() {
  const router = useRouter();

  const [profileImage, setProfileImage] = useState<string | null>(mockUser.profileImageUrl);
  const [nickname, setNickname] = useState(mockUser.nickname);
  const [nicknameError, setNicknameError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setProfileImage(reader.result as string);
    reader.readAsDataURL(file);
  };

  const validateNickname = (value: string) => {
    if (value.length === 0) {
      setNicknameError('닉네임을 입력해 주세요.');
    } else if (value.length > 10) {
      setNicknameError('열 자 이하로 작성해주세요.');
    } else {
      setNicknameError('');
    }
  };

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (nicknameError || nickname.trim() === '') return;
    // TODO: API 연동
    alert('프로필이 저장되었습니다.');
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    let valid = true;

    if (newPassword.length < 8) {
      setPasswordError('8자 이상 입력해주세요.');
      valid = false;
    } else {
      setPasswordError('');
    }

    if (newPassword !== confirmPassword) {
      setConfirmPasswordError('비밀번호가 일치하지 않습니다.');
      valid = false;
    } else {
      setConfirmPasswordError('');
    }

    if (!valid) return;
    // TODO: API 연동
    alert('비밀번호가 변경되었습니다.');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const isProfileValid =
    nickname.trim() !== '' && nicknameError === '' && nickname !== mockUser.nickname;
  const isPasswordValid = currentPassword !== '' && newPassword !== '' && confirmPassword !== '';

  return (
    <div className={styles.page}>
      <button className={styles.backButton} onClick={() => router.back()}>
        <ArrowLeftIcon size={20} />
        돌아가기
      </button>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>프로필</h2>
        <div className={styles.profileCard}>
          <div className={styles.avatarArea}>
            <button
              type="button"
              className={styles.avatarButton}
              onClick={() => fileInputRef.current?.click()}
              aria-label="프로필 사진 변경"
            >
              {profileImage ? (
                <Image src={profileImage} alt="프로필 이미지" fill className={styles.avatarImage} />
              ) : (
                <span className={styles.avatarPlus}>+</span>
              )}
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className={styles.hiddenInput}
              onChange={handleImageChange}
            />
          </div>

          <form className={styles.profileForm} onSubmit={handleProfileSave}>
            <div className={styles.inputGroup}>
              <label className={styles.label} htmlFor="email">
                이메일
              </label>
              <input
                id="email"
                type="email"
                className={`${styles.inputField} ${styles.disabled}`}
                value={mockUser.email}
                disabled
                readOnly
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label} htmlFor="nickname">
                닉네임
              </label>
              <input
                id="nickname"
                type="text"
                className={`${styles.inputField} ${nicknameError ? styles.inputError : ''}`}
                value={nickname}
                onChange={(e) => {
                  setNickname(e.target.value);
                  validateNickname(e.target.value);
                }}
                onBlur={() => validateNickname(nickname)}
                placeholder="닉네임을 입력해 주세요"
              />
              {nicknameError && <p className={styles.errorMessage}>{nicknameError}</p>}
            </div>

            <button type="submit" className={styles.submitButton} disabled={!isProfileValid}>
              저장
            </button>
          </form>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>비밀번호 변경</h2>

        <form className={styles.passwordCard} onSubmit={handlePasswordChange}>
          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="currentPassword">
              현재 비밀번호
            </label>
            <div className={styles.inputWrapper}>
              <input
                id="currentPassword"
                type={showCurrent ? 'text' : 'password'}
                className={styles.inputField}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="비밀번호 입력"
              />
              <button
                type="button"
                className={styles.eyeButton}
                onClick={() => setShowCurrent((v) => !v)}
                aria-label="비밀번호 표시"
              >
                {showCurrent ? <VisibilityOnIcon size={20} /> : <VisibilityOffIcon size={20} />}
              </button>
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="newPassword">
              새 비밀번호
            </label>
            <div className={styles.inputWrapper}>
              <input
                id="newPassword"
                type={showNew ? 'text' : 'password'}
                className={`${styles.inputField} ${passwordError ? styles.inputError : ''}`}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                onBlur={() => {
                  if (newPassword.length > 0 && newPassword.length < 8)
                    setPasswordError('8자 이상 입력해주세요.');
                  else setPasswordError('');
                }}
                placeholder="새 비밀번호 입력"
              />
              <button
                type="button"
                className={styles.eyeButton}
                onClick={() => setShowNew((v) => !v)}
                aria-label="비밀번호 표시"
              >
                {showNew ? <VisibilityOnIcon size={20} /> : <VisibilityOffIcon size={20} />}
              </button>
            </div>
            {passwordError && <p className={styles.errorMessage}>{passwordError}</p>}
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="confirmPassword">
              새 비밀번호 확인
            </label>
            <div className={styles.inputWrapper}>
              <input
                id="confirmPassword"
                type={showConfirm ? 'text' : 'password'}
                className={`${styles.inputField} ${confirmPasswordError ? styles.inputError : ''}`}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onBlur={() => {
                  if (confirmPassword !== '' && confirmPassword !== newPassword)
                    setConfirmPasswordError('비밀번호가 일치하지 않습니다.');
                  else setConfirmPasswordError('');
                }}
                placeholder="새 비밀번호 입력"
              />
              <button
                type="button"
                className={styles.eyeButton}
                onClick={() => setShowConfirm((v) => !v)}
                aria-label="비밀번호 표시"
              >
                {showConfirm ? <VisibilityOnIcon size={20} /> : <VisibilityOffIcon size={20} />}
              </button>
            </div>
            {confirmPasswordError && <p className={styles.errorMessage}>{confirmPasswordError}</p>}
          </div>

          <button type="submit" className={styles.submitButton} disabled={!isPasswordValid}>
            변경
          </button>
        </form>
      </section>
    </div>
  );
}
