import Image from 'next/image';
import Link from 'next/link';
import carrotMarkImage from '@/assets/character/carrot1.svg';
import facebookIcon from '@/assets/icon/facebook.svg';
import instagramIcon from '@/assets/icon/instagram.svg';
import logoImage from '@/assets/logo/Do!ngFarm.svg';
import { PATH } from '@/lib/constants/path';
import styles from './LandingFooter.module.css';

interface LandingFooterProps {
  footerLinks: readonly string[];
}

export function LandingFooter({ footerLinks }: LandingFooterProps) {
  return (
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
  );
}
