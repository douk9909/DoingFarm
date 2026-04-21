import Link from 'next/link';
import styles from './Sidebar.module.css';
import { PATH } from '@/lib/constants/path';
import logo from '../../../assets/Do!ngFarm_logo.svg';
import plus_ic from '../../../assets/icon/ic_plus2.svg';
import home from '../../../assets/icon/ic_home.svg';
import Image from 'next/image';

export default function Sidebar() {
  return (
    <aside className={styles.sideBar}>
      <Link href={PATH.HOME}>
        <Image src={logo} alt="로고" />
      </Link>
      <div>
        <span>대시보드 추가</span>
        <button>
          <Image src={plus_ic} alt="추가" />
        </button>
      </div>
      <div>
        <Image className={styles.homeImg} src={home} alt="홈" />
        <Link href={PATH.MY_DASHBOARD}>홈</Link>
      </div>

      <div>
        <p>대시보드 목록</p>
        <button type="button">+ 새 대시보드</button>
      </div>
    </aside>
  );
}
