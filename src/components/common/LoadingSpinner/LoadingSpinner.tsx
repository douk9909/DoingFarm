import Image from 'next/image';
import CharacterImage from '@/assets/character/carrot1.svg';
import styles from './LoadingSpinner.module.css';

export default function LoadingSpinner() {
  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <div className={styles.spinnerWrapper}>
          {[...Array(8)].map((_, i) => (
            <div key={i} className={styles.dot} style={{ '--i': i } as any} />
          ))}

          {/* 중앙 캐릭터 */}
          <div className={styles.characterBox}>
            <Image
              src={CharacterImage}
              alt="래디시"
              width={60}
              height={70}
              className={styles.character}
            />
          </div>
        </div>

        <p className={styles.text}>로딩 중...</p>
      </div>
    </div>
  );
}
