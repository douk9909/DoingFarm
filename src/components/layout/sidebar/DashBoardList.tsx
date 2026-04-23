import Link from 'next/link';
import styles from './DashBoardList.module.css';
import { PATH } from '@/lib/constants/path';
import plusIcon from '@/assets/icon/ic_plus2.svg';
import homeIcon from '@/assets/icon/ic_home.svg';
import Image from 'next/image';
import DashBoardItem from './DashBoardItem';

export default function DashBoardList() {
  return (
    <div className={styles.sideMenu}>
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
        <DashBoardItem />
      </section>
    </div>
  );
}
