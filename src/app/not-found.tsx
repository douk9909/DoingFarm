'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './not-found.module.css';
import Image from 'next/image';
import notFoundCarrot from '@/assets/character/404carrot.svg';

export default function NotFound() {
  const router = useRouter();

  return (
    <main className={styles.container}>
      <div className={styles.content}>
        <div className={styles.characterWrapper}>
          <Image
            src={notFoundCarrot}
            alt="길을 잃은 당근 캐릭터"
            width={311}
            height={271}
            priority
            className={styles.character}
          />
        </div>

        <h1 className={styles.title}>요청하신 페이지를 찾을 수 없습니다.</h1>

        <p className={styles.description}>
          페이지 주소가 잘못 입력되었거나, 주소가 변경 또는 삭제되어
          <br />
          요청하신 페이지를 찾을 수 없습니다.
          <br />
          <br />
          서비스 이용에 불편을 드려 죄송합니다.
        </p>

        <div className={styles.buttonGroup}>
          <Link href="/" className={styles.primaryButton}>
            홈으로 가기
          </Link>
          <button type="button" className={styles.secondaryButton} onClick={() => router.back()}>
            이전 페이지
          </button>
        </div>
      </div>
    </main>
  );
}
