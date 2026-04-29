'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import notFoundCarrot from '@/assets/character/404carrot.svg';

import styles from './not-found.module.css';

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

        <h1 className={styles.title}>요청하신 페이지 권한이 없습니다.</h1>

        <p className={styles.description}>
          접근하신 대시보드가 존재하지 않거나, <br />
          해당 대시보드를 수정할 수 있는 권한이 없습니다. <br />
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
