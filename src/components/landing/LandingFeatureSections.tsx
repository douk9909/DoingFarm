import Image from 'next/image';
import landingCircleLineLeftImage from '@/assets/backgroundImg/landing-circle-line-left.svg';
import landingCircleLineRightImage from '@/assets/backgroundImg/landing-circle-line-right.svg';
import mainImage1 from '@/assets/mainImg/mainimg1.svg';
import mainImage2 from '@/assets/mainImg/mainimg2.svg';
import mainImage3 from '@/assets/mainImg/mainimg3.svg';
import doingfarmInstaImage from '@/assets/mainImg/doingfarmInsta.svg';
import type { FeatureContent } from './landingContent';
import styles from './LandingFeatureSections.module.css';

interface LandingFeatureSectionsProps {
  featureContents: readonly [FeatureContent, FeatureContent, FeatureContent, FeatureContent];
}

interface FeatureCopyBlockProps extends FeatureContent {
  wide?: boolean;
}

function FeatureCopyBlock({ label, title, description, wide = false }: FeatureCopyBlockProps) {
  return (
    <div className={wide ? styles.featureCopyWide : styles.featureCopy}>
      <p className={styles.pointLabel}>{label}</p>
      <h2 className={styles.pointTitle}>
        <span className={styles.titleLine}>{title[0]}</span>
        <span className={styles.titleLine}>{title[1]}</span>
      </h2>
      <p className={styles.pointDescription}>
        {description[0]}
        <br />
        {description[1]}
      </p>
    </div>
  );
}

export function LandingFeatureSections({ featureContents }: LandingFeatureSectionsProps) {
  return (
    <main className={styles.content}>
      <section className={styles.featureSection}>
        <Image
          src={landingCircleLineRightImage}
          alt=""
          width={753}
          height={800}
          className={styles.contentCircleLineRight}
          aria-hidden
        />

        <div className={styles.featureVisualSingle}>
          <Image
            src={mainImage1}
            alt="사진 카드 섹션 미리보기"
            width={736}
            height={613}
            className={styles.featureShowcaseImage}
          />
        </div>

        <FeatureCopyBlock {...featureContents[0]} />
      </section>

      <section className={styles.featureSectionReverse}>
        <Image
          src={landingCircleLineLeftImage}
          alt=""
          width={479}
          height={490}
          className={styles.contentCircleLineLeft}
          aria-hidden
        />

        <FeatureCopyBlock {...featureContents[1]} />

        <div className={styles.detailPanel}>
          <Image
            src={mainImage2}
            alt="상세 정보 패널"
            width={709}
            height={613}
            className={styles.detailPanelImage}
          />
        </div>
      </section>

      <section className={styles.featureSectionColumn}>
        <FeatureCopyBlock {...featureContents[2]} wide />

        <div className={styles.featureWidePanel}>
          <Image
            src={mainImage3}
            alt="설정과 관리 패널"
            width={1434}
            height={329}
            className={styles.featureWideImage}
          />
        </div>
      </section>

      <section className={styles.featureSectionColumn}>
        <FeatureCopyBlock {...featureContents[3]} wide />

        <div className={styles.featureInstaPanel}>
          <Image
            src={doingfarmInstaImage}
            alt="두잉팜 인스타그램 안내 카드"
            width={977}
            height={269}
            className={styles.featureInstaImage}
          />
        </div>
      </section>
    </main>
  );
}
