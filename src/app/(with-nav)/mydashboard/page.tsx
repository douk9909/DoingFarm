import Image, { type StaticImageData } from 'next/image';
import myDashboardBgImage from '@/assets/backgroundImg/dashboard_bg.svg';
import dashboardBoxImage from '@/assets/character/empty_box.svg';
import dashboardCarrotImage from '@/assets/character/empty_carrot.svg';
import EmptyDashboardPanel from './_components/EmptyDashboardPanel';
import styles from './page.module.css';

interface DashboardSection {
  title: string;
  message: string;
  image: StaticImageData;
  imageAlt: string;
  actionLabel?: string;
  hideTitle?: boolean;
  priority?: boolean;
}

const dashboardSections: readonly DashboardSection[] = [
  {
    title: '내 대시보드',
    message: '대시보드가 없습니다.',
    image: dashboardBoxImage,
    imageAlt: '대시보드 박스',
    actionLabel: '생성하기',
    hideTitle: true,
    priority: true,
  },
  {
    title: '초대 받은 대시보드',
    message: '아직 초대받은 대시보드가 없습니다.',
    image: dashboardCarrotImage,
    imageAlt: '초대 받은 대시보드 캐릭터',
  },
] as const;

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
            <p className={styles.breadcrumb}>홈</p>
            <h1 className={styles.pageTitle}>내 대시보드</h1>
          </header>

          <div className={styles.sectionList}>
            {dashboardSections.map((section) => (
              <section key={section.title} className={styles.section}>
                {section.hideTitle ? null : (
                  <h2 className={styles.sectionTitle}>{section.title}</h2>
                )}

                <EmptyDashboardPanel
                  message={section.message}
                  image={section.image}
                  imageAlt={section.imageAlt}
                  actionLabel={section.actionLabel}
                  priority={section.priority}
                />
              </section>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
