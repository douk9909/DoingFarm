import { LandingFeatureSections } from '@/components/landing/LandingFeatureSections';
import { LandingFooter } from '@/components/landing/LandingFooter';
import { LandingIntroSection } from '@/components/landing/LandingIntroSection';
import {
  landingFeatureContents,
  landingFooterLinks,
  landingHeroContent,
  landingNavItems,
} from '@/components/landing/landingContent';
import styles from './page.module.css';

export default function LandingPage() {
  return (
    <div className={styles.page}>
      <LandingIntroSection navItems={landingNavItems} {...landingHeroContent} />
      <LandingFeatureSections featureContents={landingFeatureContents} />
      <LandingFooter footerLinks={landingFooterLinks} />
    </div>
  );
}
