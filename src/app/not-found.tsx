'use client';
import { useRouter } from 'next/navigation';
import styles from './not-found.module.css';
import Image from 'next/image';
import notFoundCarrot from '@/assets/character/404carrot.svg';
import Button from '@/components/common/Button/Button';
import { getToken } from '@/lib/utils/storage';

export default function NotFound() {
  const router = useRouter();

  const handleHome = () => {
    const isLoggedIn = !!getToken();
    router.push(isLoggedIn ? '/mydashboard' : '/');
  };

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
          <Button variant="primary" onClick={handleHome}>
            홈으로 가기
          </Button>
          <Button variant="secondary" onClick={() => router.back()}>
            이전 페이지
          </Button>
        </div>
      </div>
    </main>
  );
}
