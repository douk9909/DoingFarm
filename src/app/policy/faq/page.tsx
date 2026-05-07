import { LandingHeader } from '@/components/landing/LandingHeader';
import { faqContent, landingNavItems } from '@/components/landing/landingContent';
import styles from './page.module.css';

export default function FaqPage() {
  const { title, description, items } = faqContent;

  return (
    <div className={styles.container}>
      <LandingHeader navItems={landingNavItems} />
      <div className={styles.pageWrapper}>
        <div className={styles.header}>
          <span className={styles.label}>HELP CENTER</span>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.description}>{description}</p>
        </div>

        <div className={styles.accordionContainer}>
          {items.map((item) => (
            <details key={item.id} className={styles.details}>
              <summary className={styles.summary}>
                <div className={styles.questionWrapper}>
                  <span className={styles.number}>{String(item.id).padStart(2, '0')}</span>
                  <span className={styles.questionText}>{item.question}</span>
                </div>
                {/* 플러스(+) 아이콘 애니메이션용 div */}
                <div className={styles.plusIcon}></div>
              </summary>
              <div className={styles.answerWrapper}>
                <p className={styles.answerText}>{item.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
}
