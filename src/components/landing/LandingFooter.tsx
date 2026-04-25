import Image from 'next/image';
import Link from 'next/link';
import carrotMarkImage from '@/assets/character/carrot1.svg';
import InstagramIcon from '@/assets/icons/InstagramIcon';
import FacebookIcon from '@/assets/icons/FacebookIcon';
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
          <span key={label} className={styles.footerTextLink}>
            {label}
          </span>
        ))}
      </div>

      <div className={styles.footerSocials}>
        <a
          href="https://www.instagram.com/doingfarm/"
          target="_blank"
          rel="noreferrer"
          className={styles.socialLink}
          aria-label="DoingFarm Instagram"
        >
          <InstagramIcon size={18} />
        </a>
        <span className={styles.socialLink} aria-label="Facebook" role="img">
          <FacebookIcon size={18} />
        </span>
      </div>
    </footer>
  );
}
