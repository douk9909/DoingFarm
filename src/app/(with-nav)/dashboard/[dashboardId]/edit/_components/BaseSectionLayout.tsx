import styles from '../edit.module.css';

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
          {headerButton}
        </div>
        {pagination && <div>{pagination}</div>}
      </div>
      <div className={styles.sectionContent}>{children}</div>
    </section>
  );
}
