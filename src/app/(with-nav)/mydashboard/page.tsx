import Image from 'next/image';
import myDashboardBgImage from '@/assets/backgroundImg/dashboard_bg.svg';
import dashboardBoxImage from '@/assets/character/empty_box.svg';
import dashboardCarrotImage from '@/assets/character/empty_carrot.svg';
import Button from '@/components/common/button/Button';
import styles from './page.module.css';

export default function MyDashboardPage() {
  return (
    <section className={styles.page}>
      <div className={styles.backgroundLayer}>
        <Image
          src={myDashboardBgImage}
          alt=""
          fill
          sizes="100vw"
          className={styles.backgroundImage}
          priority
        />
      </div>

      <div className={styles.canvas}>
        <div className={styles.inner}>
          <header className={styles.hero}>
            <div className={styles.heroText}>
              <p className={styles.breadcrumb}>홈</p>
              <h1 className={styles.title}>내 대시보드</h1>
            </div>
          </header>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>내 대시보드</h2>

            <div className={styles.panel}>
              <div className={styles.emptyState}>
                <Image
                  src={dashboardBoxImage}
                  alt="대시보드 박스"
                  width={110}
                  height={74}
                  className={styles.stateImage}
                  priority
                />

                <p className={styles.message}>대시보드가 없습니다.</p>

                <Button size="sm" className={styles.createButton}>
                  생성하기 +
                </Button>
              </div>
            </div>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>초대 받은 대시보드</h2>

            <div className={styles.panel}>
              <div className={styles.emptyState}>
                <Image
                  src={dashboardCarrotImage}
                  alt="초대 받은 대시보드 캐럿"
                  width={110}
                  height={74}
                  className={styles.stateImage}
                />

                <p className={styles.message}>아직 초대받은 대시보드가 없습니다.</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}
