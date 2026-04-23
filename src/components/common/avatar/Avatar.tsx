import { useMemo } from 'react';
import { cn } from '@/lib/utils/cn';
import styles from './Avatar.module.css';

const COLORS = [
  'var(--color-profile-green)',
  'var(--color-profile-violet)',
  'var(--color-profile-cyan)',
  'var(--color-profile-rose)',
  'var(--color-profile-cobalt)',
  'var(--color-profile-yellow)',
  'var(--color-profile-orange)',
] as const;

interface AvatarProps {
  src?: string | null;
  alt?: string;
  name: string;
  className?: string;
}

export default function Avatar({ src, alt = 'profileImage', name, className }: AvatarProps) {
  const displayName = useMemo(() => {
    if (!name) return '';

    const isKorean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(name);

    if (isKorean) {
      return name.length > 1 ? name.slice(1, 3) : name;
    } else {
      return name.charAt(0).toUpperCase();
    }
  }, [name]);

  const profileBgColor = useMemo(() => {
    const charCodeSum = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return COLORS[charCodeSum % COLORS.length];
  }, [name]);

  return (
    <div
      className={cn(styles.avatar, className)}
      style={{ backgroundColor: !src ? profileBgColor : undefined }}
    >
      {src ? (
        <img src={src} alt={alt} className={styles.profileImage} />
      ) : (
        <span className={styles.initial}>{displayName}</span>
      )}
    </div>
  );
}
