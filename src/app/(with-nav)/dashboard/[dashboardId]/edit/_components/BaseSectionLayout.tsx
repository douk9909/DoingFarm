import styles from '../edit.module.css';

import Button from '@/components/common/button/Button';
import UserPlusIcon from '@/assets/icons/UserPlusIcon';

interface BaseSectionLayoutProps {
  title: string;
  headerNum?: number;
  headerButton?: React.ReactNode;
  pagination?: React.ReactNode;
  children: React.ReactNode;
}

export default function BaseSectionLayout({
  title,
  headerNum,
  headerButton,
  pagination,
  children,
}: BaseSectionLayoutProps) {
  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <div className={styles.sectionTitleWrapper}>
          <h2 className={styles.title}>{title}</h2>
          {headerNum && <span className={styles.memberNum}>{headerNum}</span>}
          {headerButton && (
            <Button className={styles.inviteButton}>
              <UserPlusIcon size={18} color="var(--color-gray-900)" />
              <span>초대</span>
            </Button>
          )}
        </div>
        {pagination && <div>{pagination}</div>}
      </div>
      <div className={styles.sectionContent}>{children}</div>
    </section>
  );
}
