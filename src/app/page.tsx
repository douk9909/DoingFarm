'use client';

import Image from 'next/image';
import Link from 'next/link';
import logoImage from '@/assets/logo/Do!ngFarm.svg';
import dashboardHeroImage from '@/assets/backgroundImg/dashboard_bg.svg';
import dashboardPreviewImage from '@/assets/mainImg/dashboard.svg';
import mainImage1 from '@/assets/mainImg/mainimg1.svg';
import mainImage2 from '@/assets/mainImg/mainimg2.svg';
import mainImage3 from '@/assets/mainImg/mainimg3.svg';
import carrotMarkImage from '@/assets/character/carrot1.svg';
import standingCarrotImage from '@/assets/character/standing_carrot.svg';
import instagramIcon from '@/assets/icon/instagram.svg';
import facebookIcon from '@/assets/icon/facebook.svg';
import Button from '@/components/common/button/Button';
import { PATH } from '@/lib/constants/path';
import styles from './page.module.css';

const navItems = [
  { href: PATH.LOGIN, label: '로그인' },
  { href: PATH.SIGNUP, label: '회원가입' },
] as const;

const footerLinks = ['Privacy Policy', 'FAQ'] as const;

const featureContents = [
  {
    label: 'Point 1',
    title: ['내가 등록한 사진으로', '기억에 남는 할 일 리스트'],
    description: [
      '카드 내 추가한 이미지를 상단 썸네일로 노출하여',
      '작업에 대한 내용을 더 직관적으로 떠올릴 수 있어요',
    ],
  },
  {
    label: 'Point 2',
    title: ['자세한 정보는 명확하게,', '팀 논의는 빠르게 확인하세요'],
    description: [
      '작업에 필요한 세부 내용을 손쉽게 정리하고,',
      '댓글을 통해 팀원들과 빠르게 소통해보세요',
    ],
  },
  {
    label: 'Point 3',
    title: ['나에게 맞게, 더 효율적으로', '생산성을 높이는 다양한 설정'],
    description: [
      '작업 방식에 맞게 색상, 팀원, 구성원 등을 쉽게 관리할 수 있어요',
      '환경을 조율하면 일은 더 가볍고 빠르게 흘러갑니다.',
    ],
  },
] as const;

interface FeatureCopyBlockProps {
  label: string;
  title: readonly [string, string];
  description: readonly [string, string];
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

export default function LandingPage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroBackground}>
          <Image
            src={dashboardHeroImage}
            alt=""
            fill
            priority
            sizes="100vw"
            className={styles.heroBackgroundImage}
          />
        </div>

        <header className={styles.topbar}>
          <Link href={PATH.HOME} className={styles.logoLink}>
            <span className={styles.brandMark}>
              <Image
                src={carrotMarkImage}
                alt=""
                width={28}
                height={34}
                className={styles.brandCarrot}
                priority
              />
            </span>
            <Image
              src={logoImage}
              alt="Do!ngFarm"
              width={133}
              height={30}
              className={styles.logo}
              priority
            />
          </Link>

          <nav className={styles.topnav}>
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className={styles.topnavLink}>
                {item.label}
              </Link>
            ))}
          </nav>
        </header>

        <div className={styles.heroInner}>
          <section className={styles.heroCopy}>
            <h1 className={styles.heroTitle}>
              <span className={styles.heroTitleLine}>더 새로운 일정 관리</span>
              <span className={styles.heroTitleAccent}>할일농장</span>
            </h1>

            <div className={styles.heroActions}>
              <Link href={PATH.SIGNUP}>
                <Button variant="secondary" size="lg" className={styles.heroButtonSecondary}>
                  회원가입 하기
                </Button>
              </Link>
              <Link href={PATH.LOGIN}>
                <Button variant="primary" size="lg" className={styles.heroButtonPrimary}>
                  로그인하기
                </Button>
              </Link>
            </div>
          </section>

          <section className={styles.heroShowcase}>
            <div className={styles.showcaseMain}>
              <Image
                src={dashboardPreviewImage}
                alt="할일농장 대표 화면"
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
          alt="캐럿"
          width={439}
          height={439}
          className={styles.heroCarrot}
        />
      </section>

      <main className={styles.content}>
        <section className={styles.featureSection}>
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
      </main>

      <footer className={styles.footer}>
        <Link href={PATH.HOME} className={styles.footerLogoLink}>
          <span className={styles.footerBrandMark}>
            <Image
              src={carrotMarkImage}
              alt=""
              width={18}
              height={22}
              className={styles.footerBrandCarrot}
            />
          </span>
          <Image
            src={logoImage}
            alt="Do!ngFarm"
            width={96}
            height={22}
            className={styles.footerLogo}
          />
        </Link>

        <div className={styles.footerLinks}>
          {footerLinks.map((label) => (
            <a key={label} href="#" className={styles.footerTextLink}>
              {label}
            </a>
          ))}
        </div>

        <div className={styles.footerSocials}>
          <a href="#" className={styles.socialLink} aria-label="Instagram">
            <Image src={instagramIcon} alt="" width={18} height={18} />
          </a>
          <a href="#" className={styles.socialLink} aria-label="Facebook">
            <Image src={facebookIcon} alt="" width={18} height={18} />
          </a>
        </div>
      </footer>
    </div>
  );
}
