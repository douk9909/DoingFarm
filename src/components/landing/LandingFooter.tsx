import Image from 'next/image';
import Link from 'next/link';
import carrotMarkImage from '@/assets/character/carrot1.svg';
import InstagramIcon from '@/assets/icons/InstagramIcon';
import FacebookIcon from '@/assets/icons/FacebookIcon';
import logoImage from '@/assets/logo/Do!ngFarm.svg';
import { PATH } from '@/lib/constants/path';
import styles from './LandingFooter.module.css';

interface FooterLink {
  readonly label: string;
  readonly href: string;
}

interface LandingFooterProps {
  footerLinks: readonly FooterLink[];
}

export function LandingFooter({ footerLinks }: LandingFooterProps) {
  return (
    <footer className={styles.footer}>
      <Link href={PATH.HOME} className={styles.footerLogoLink}>
        <Image
          src={carrotMarkImage}
          alt=""
          width={28}
          height={28}
          className={styles.footerBrandCarrot}
        />
        <Image
          src={logoImage}
          alt="Do!ngFarm"
          width={116}
          height={32}
          className={styles.footerLogo}
        />
      </Link>

      <div className={styles.footerLinks}>
        {footerLinks.map((link) => (
          <Link key={link.label} href={link.href} className={styles.footerTextLink}>
            {link.label}
          </Link>
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
      </div>
    </footer>
  );
}
