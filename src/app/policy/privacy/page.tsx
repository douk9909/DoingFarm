import { LandingHeader } from '@/components/landing/LandingHeader';
import { privacyPolicy, landingNavItems } from '@/components/landing/landingContent';
import type { PrivacyPolicyData } from '@/components/landing/landingContent';

import styles from './page.module.css';

interface PrivacyPageProps {
  policy: PrivacyPolicyData;
}

export default function PrivacyPage() {
  const { title, version, description, updatedAt, sections }: PrivacyPageProps['policy'] =
    privacyPolicy;

  return (
    <div className={styles.container}>
      <LandingHeader navItems={landingNavItems} />
      <div className={styles.pageWrapper}>
        <div className={styles.header}>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.description}>{description}</p>
          <div className={styles.meta}>
            <span className={styles.version}>version {version}</span>
            <span className={styles.divider}>|</span>
            <span className={styles.updatedAt}>최종 수정일: {updatedAt}</span>
          </div>
        </div>
        <div className={styles.content}>
          {sections.map((section) => (
            <section key={section.id} className={styles.section}>
              <h2 className={styles.sectionTitle}>{section.title}</h2>
              <div className={styles.sectionBody}>
                <p className={styles.sectionText}>{section.content}</p>
                {section.subList && (
                  <ul className={styles.subList}>
                    {section.subList.map((item, idx) => (
                      <li key={idx} className={styles.subListItem}>
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
