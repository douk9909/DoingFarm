import Link from 'next/link';
import styles from './Sidebar.module.css';
import { PATH } from '@/lib/constants/path';
import logo from '@/assets/logo/Do!ngFarm.svg';
import plusIcon from '@/assets/icon/ic_plus2.svg';
import homeIcon from '@/assets/icon/ic_home.svg';
import tagRed from '@/assets/hashTags/red.svg';
import tagOrange from '@/assets/hashTags/orange.svg';
import tagYellow from '@/assets/hashTags/yellow.svg';
import tagBlue from '@/assets/hashTags/blue.svg';
import tagGreen from '@/assets/hashTags/green.svg';
import pinIcon from '@/assets/icon/icon_pin.svg';
import crownIcon from '@/assets/icon/ic_crown.svg';
import settingIcon from '@/assets/icon/ic_setting.svg';
import Image from 'next/image';

export default function Sidebar() {
  return (
    <aside className={styles.sideBar}>
      <div>
        <header className={styles.logoWrapper}>
          <Link href={PATH.HOME}>
            <Image className={styles.logo} src={logo} alt="로고" width={148} height={33} />
          </Link>
        </header>

        <main className={styles.sideMenu}>
          <section className={styles.add}>
            <span>대시보드 추가</span>
            <button>
              <Image className={styles.plus} src={plusIcon} alt="추가" width={12.5} height={12.5} />
            </button>
          </section>

          <section className={styles.home}>
            <Link href={PATH.MY_DASHBOARD}>
              <Image className={styles.homeImg} src={homeIcon} alt="홈" width={18} height={18} />
              <span>홈</span>
            </Link>
          </section>

          <section className={styles.menus}>
            <div className={styles.menu}>
              <div>
                <Image className={styles.hashTag} src={tagRed} alt="" width={24} height={24} />
                <p>포트폴리오</p>
                <Image className={styles.pin} src={pinIcon} alt="" width={24} height={24} />
              </div>
              <Image className={styles.crown} src={crownIcon} alt="" width={24} height={24} />
            </div>

            <div className={styles.menu}>
              <div>
                <Image className={styles.hashTag} src={tagOrange} alt="" width={24} height={24} />
                <p>포트폴리오</p>
                <Image className={styles.pin} src={pinIcon} alt="" width={24} height={24} />
              </div>
              <Image className={styles.crown} src={crownIcon} alt="" width={24} height={24} />
            </div>

            <div className={styles.menu}>
              <div>
                <Image className={styles.hashTag} src={tagYellow} alt="" width={24} height={24} />
                <p>포트폴리오</p>
                <Image className={styles.pin} src={pinIcon} alt="" width={24} height={24} />
              </div>
              <Image className={styles.crown} src={crownIcon} alt="" width={24} height={24} />
            </div>

            <div className={styles.menu}>
              <div>
                <Image className={styles.hashTag} src={tagBlue} alt="" width={24} height={24} />
                <p>포트폴리오</p>
                <Image className={styles.pin} src={pinIcon} alt="" width={24} height={24} />
              </div>
              <Image className={styles.crown} src={crownIcon} alt="" width={24} height={24} />
            </div>

            <div className={styles.menu}>
              <div>
                <Image className={styles.hashTag} src={tagGreen} alt="" width={24} height={24} />
                <p>포트폴리오</p>
                <Image className={styles.pin} src={pinIcon} alt="" width={24} height={24} />
              </div>
              <Image className={styles.crown} src={crownIcon} alt="" width={24} height={24} />
            </div>
          </section>
        </main>
      </div>
      <footer className={styles.footer}>
        <div className={styles.nameWrapper}>
          <div className={styles.profile}>민영</div>
          <p className={styles.userName}>박민영</p>
        </div>
        <Image src={settingIcon} alt="세팅" width={24} height={24} />
      </footer>
    </aside>
  );
}
