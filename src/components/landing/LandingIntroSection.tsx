import Image from 'next/image';
import Link from 'next/link';
import dashboardHeroImage from '@/assets/backgroundImg/dashboard_bg.svg';
import standingCarrotImage from '@/assets/character/standing_carrot.svg';
import dashboardPreviewImage from '@/assets/mainImg/dashboard.svg';
import { PATH } from '@/lib/constants/path';
import { LandingHeader } from './LandingHeader';
import type { LandingNavItem } from './landingContent';
import styles from './LandingIntroSection.module.css';

interface LandingIntroSectionProps {
  navItems: readonly LandingNavItem[];
  titleLine: string;
  titleAccent: string;
  signupLabel: string;
  loginLabel: string;
}

const dashboardHeroImageOpacity = 0.68;

export function LandingIntroSection({
  navItems,
  titleLine,
  titleAccent,
  signupLabel,
  loginLabel,
}: LandingIntroSectionProps) {
  return (
    <section className={styles.hero}>
      <div className={styles.heroBackground}>
        <Image
          src={dashboardHeroImage}
          alt=""
          fill
          priority
          sizes="100vw"
          className={styles.heroBackgroundImage}
          style={{ opacity: dashboardHeroImageOpacity }}
        />
      </div>

      <LandingHeader navItems={navItems} />

      <div className={styles.heroInner}>
        <section className={styles.heroCopy}>
          <h1 className={styles.heroTitle}>
            <span className={styles.heroTitleLine}>{titleLine}</span>
            <span className={styles.heroTitleAccent}>{titleAccent}</span>
          </h1>

          <div className={styles.heroActions}>
            <Link href={PATH.SIGNUP} className={styles.heroButtonSecondary}>
              {signupLabel}
            </Link>
            <Link href={PATH.LOGIN} className={styles.heroButtonPrimary}>
              {loginLabel}
            </Link>
          </div>
        </section>

        <section className={styles.heroShowcase}>
          <div className={styles.showcaseMain}>
            <Image
              src={dashboardPreviewImage}
              alt="할일농장 대시보드 미리보기 화면"
              width={1190}
              height={848}
              className={styles.showcaseMainImage}
              priority
            />
          </div>
        </section>
      </div>

      <Image
        src={standingCarrotImage}
        alt=""
        width={439}
        height={439}
        className={styles.heroCarrot}
      />
    </section>
  );
}
