'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import styles from './DashBoardList.module.css';
import { PATH } from '@/lib/constants/path';
import plusIcon from '@/assets/icon/ic_plus2.svg';
import homeIcon from '@/assets/icon/ic_home.svg';
import Image from 'next/image';
import DashBoardItem from './DashBoardItem';
import { useDashboardCreateModal } from '@/components/dashboard/create/DashboardCreateModalProvider';
import { useDashboards } from '@/hooks/queries/useDashboards';
import { useDashboard } from '@/contexts/DashboardContext';

export default function DashBoardList() {
  const pathName = usePathname();
  const isHomeActive = pathName === PATH.MY_DASHBOARD;
  const { openDashboardCreateModal, dashboardListVersion } = useDashboardCreateModal();
  // 생성 모달에서 version을 올리면 목록을 다시 불러옴
  const { dashboards, isLoading, error } = useDashboards(dashboardListVersion);

  const { title, color } = useDashboard();

  return (
    <div className={styles.sideMenu}>
      <section className={styles.add}>
        <span>대시보드 추가</span>
        <button type="button" onClick={openDashboardCreateModal}>
          <Image className={styles.plus} src={plusIcon} alt="추가" width={12.5} height={12.5} />
        </button>
      </section>

      <section className={`${styles.home} ${isHomeActive ? styles.active : ''}`}>
        <Link href={PATH.MY_DASHBOARD}>
          <Image className={styles.homeImg} src={homeIcon} alt="홈" width={18} height={18} />
          <span>홈</span>
        </Link>
      </section>

      <section className={styles.menus}>
        {isLoading ? <p className={styles.statusText}>대시보드를 불러오는 중</p> : null}
        {error ? <p className={styles.statusText}>{error}</p> : null}
        {!isLoading && !error && dashboards.length === 0 ? (
          <p className={styles.statusText}>대시보드가 없습니다</p>
        ) : null}
        {dashboards.map((dashboard) => (
          <DashBoardItem
            key={dashboard.id}
            id={dashboard.id}
            title={title || dashboard.title}
            color={color || dashboard.color}
            createdByMe={dashboard.createdByMe}
          />
        ))}
      </section>
    </div>
  );
}
