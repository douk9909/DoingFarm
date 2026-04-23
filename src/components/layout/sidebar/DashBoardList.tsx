import Link from 'next/link';
import styles from './DashBoardList.module.css';
import { PATH } from '@/lib/constants/path';
import plusIcon from '@/assets/icon/ic_plus2.svg';
import homeIcon from '@/assets/icon/ic_home.svg';
import Image from 'next/image';
import DashBoardItem from './DashBoardItem';

const mockDashBoards = [
  { id: 1, title: '포트폴리오', color: 'red', createdByMe: true },
  { id: 2, title: '코드잇', color: 'green', createdByMe: true },
  { id: 3, title: '3분기 계획', color: 'orange', createdByMe: true },
  { id: 4, title: '회의록', color: 'yellow', createdByMe: false },
  { id: 5, title: '중요 문서', color: 'blue', createdByMe: false },
];

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
        {mockDashBoards.map((dashboard) => (
          <DashBoardItem
            key={dashboard.id}
            title={dashboard.title}
            color={dashboard.color}
            createdByMe={dashboard.createdByMe}
          />
        ))}
      </section>
    </div>
  );
}
