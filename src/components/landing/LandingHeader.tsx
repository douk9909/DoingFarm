import Image from 'next/image';
import Link from 'next/link';
import carrotMarkImage from '@/assets/character/carrot1.svg';
import logoImage from '@/assets/logo/Do!ngFarm.svg';
import { PATH } from '@/lib/constants/path';
import type { LandingNavItem } from './landingContent';
import styles from './LandingHeader.module.css';

interface LandingHeaderProps {
  navItems: readonly LandingNavItem[];
}

export function LandingHeader({ navItems }: LandingHeaderProps) {
  return (
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
  );
}
