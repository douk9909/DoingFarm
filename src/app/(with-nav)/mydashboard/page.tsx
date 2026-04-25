import Image from 'next/image';
import myDashboardBgImage from '@/assets/backgroundImg/dashboard_bg.svg';
import EmptyDashboardPanel from './_components/EmptyDashboardPanel';
import { dashboardPageContent } from './_content/dashboardContent';
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
            <p className={styles.breadcrumb}>{dashboardPageContent.breadcrumb}</p>
            <h1 className={styles.pageTitle}>{dashboardPageContent.pageTitle}</h1>
          </header>

          <div className={styles.sectionList}>
            {dashboardPageContent.sections.map((section) => (
              <section key={section.title} className={styles.section}>
                {section.hideTitle ? null : (
                  <h2 className={styles.sectionTitle}>{section.title}</h2>
                )}

                <EmptyDashboardPanel section={section} />
              </section>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
