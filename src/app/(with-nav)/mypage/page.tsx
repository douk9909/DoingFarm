'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import ArrowLeftIcon from '@/assets/icons/ArrowLeftIcon';
import VisibilityOnIcon from '@/assets/icons/VisibilityOnIcon';
import VisibilityOffIcon from '@/assets/icons/VisibilityOffIcon';
import { TextInput } from '@/components/common/input/TextInput';
import { userApi } from '@/lib/api/user';
import type { User } from '@/types/user';
import styles from './page.module.css';

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

export default function MyPage() {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);

  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);
  const [isImageChanged, setIsImageChanged] = useState(false);
  const [nickname, setNickname] = useState('');
  const [nicknameError, setNicknameError] = useState('');
  const [isProfileLoading, setIsProfileLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [isPasswordLoading, setIsPasswordLoading] = useState(false);

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    userApi.getMe().then((res) => {
      const data = res.data;
      setUser(data);
      setNickname(data.nickname);
      setProfileImageUrl(data.profileImageUrl ?? null);
    });
  }, []);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      alert('JPG, PNG, GIF, WEBP 형식의 이미지만 업로드할 수 있습니다.');
      return;
    }
    if (file.size > MAX_IMAGE_SIZE) {
      alert('이미지 크기는 5MB 이하여야 합니다.');
      return;
    }

    try {
      const res = await userApi.uploadProfileImage(file);
      setProfileImageUrl(res.data.profileImageUrl);
      setIsImageChanged(true);
    } catch {
      alert('이미지 업로드에 실패했습니다.');
    }
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

  const handleProfileSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (nicknameError || nickname.trim() === '') return;

    setIsProfileLoading(true);
    try {
      const res = await userApi.updateMe({ nickname, profileImageUrl });
      setUser(res.data);
      setIsImageChanged(false);
      alert('프로필이 저장되었습니다.');
    } catch (err) {
      alert(err instanceof Error ? err.message : '저장에 실패했습니다.');
    } finally {
      setIsProfileLoading(false);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    let valid = true;

    if (newPassword.length < 8) {
      setPasswordError('8자 이상 입력해주세요.');
      valid = false;
    } else if (newPassword === currentPassword) {
      setPasswordError('현재 비밀번호와 일치합니다.');
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

    setIsPasswordLoading(true);
    try {
      await userApi.updatePassword({ password: currentPassword, newPassword });
      alert('비밀번호가 변경되었습니다.');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      alert(err instanceof Error ? err.message : '비밀번호 변경에 실패했습니다.');
    } finally {
      setIsPasswordLoading(false);
    }
  };

  const isProfileValid =
    nickname.trim() !== '' &&
    nicknameError === '' &&
    (nickname !== user?.nickname || isImageChanged);

  const isPasswordValid =
    currentPassword !== '' &&
    newPassword !== '' &&
    confirmPassword !== '' &&
    passwordError === '' &&
    confirmPasswordError === '';

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
              {profileImageUrl ? (
                <Image
                  src={profileImageUrl}
                  alt="프로필 이미지"
                  fill
                  className={styles.avatarImage}
                />
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
            <TextInput
              label="이메일"
              id="email"
              type="email"
              value={user?.email ?? ''}
              isDisabled
              readOnly
            />
            <TextInput
              label="닉네임"
              id="nickname"
              type="nickname"
              value={nickname}
              status={nicknameError ? 'error' : 'default'}
              errorMsg={nicknameError}
              onChange={(e) => {
                setNickname(e.target.value);
                validateNickname(e.target.value);
              }}
              onBlur={() => validateNickname(nickname)}
              placeholder="닉네임을 입력해 주세요"
            />
            <button
              type="submit"
              className={styles.submitButton}
              disabled={!isProfileValid || isProfileLoading}
            >
              {isProfileLoading ? '저장 중...' : '저장'}
            </button>
          </form>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>비밀번호 변경</h2>

        <form className={styles.passwordCard} onSubmit={handlePasswordChange}>
          <TextInput
            label="현재 비밀번호"
            id="currentPassword"
            type={showCurrent ? 'text' : 'password'}
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="비밀번호 입력"
            rightIcon={
              showCurrent ? <VisibilityOnIcon size={20} /> : <VisibilityOffIcon size={20} />
            }
            onRightIconClick={() => setShowCurrent((v) => !v)}
          />
          <TextInput
            label="새 비밀번호"
            id="newPassword"
            type={showNew ? 'text' : 'password'}
            value={newPassword}
            status={passwordError ? 'error' : 'default'}
            errorMsg={passwordError}
            onChange={(e) => setNewPassword(e.target.value)}
            onBlur={() => {
              if (newPassword.length > 0 && newPassword.length < 8)
                setPasswordError('8자 이상 입력해주세요.');
              else if (newPassword.length >= 8 && newPassword === currentPassword)
                setPasswordError('현재 비밀번호와 일치합니다.');
              else setPasswordError('');
            }}
            placeholder="새 비밀번호 입력"
            rightIcon={showNew ? <VisibilityOnIcon size={20} /> : <VisibilityOffIcon size={20} />}
            onRightIconClick={() => setShowNew((v) => !v)}
          />
          <TextInput
            label="새 비밀번호 확인"
            id="confirmPassword"
            type={showConfirm ? 'text' : 'password'}
            value={confirmPassword}
            status={confirmPasswordError ? 'error' : 'default'}
            errorMsg={confirmPasswordError}
            onChange={(e) => setConfirmPassword(e.target.value)}
            onBlur={() => {
              if (confirmPassword !== '' && confirmPassword !== newPassword)
                setConfirmPasswordError('비밀번호가 일치하지 않습니다.');
              else setConfirmPasswordError('');
            }}
            placeholder="새 비밀번호 입력"
            rightIcon={
              showConfirm ? <VisibilityOnIcon size={20} /> : <VisibilityOffIcon size={20} />
            }
            onRightIconClick={() => setShowConfirm((v) => !v)}
          />
          <button
            type="submit"
            className={styles.submitButton}
            disabled={!isPasswordValid || isPasswordLoading}
          >
            {isPasswordLoading ? '변경 중...' : '변경'}
          </button>
        </form>
      </section>
    </div>
  );
}
