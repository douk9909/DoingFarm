'use client';
import { useMemo } from 'react';
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
import { usePinnedDashboards } from '@/hooks/ui/usePinnedDashboards';

export default function DashBoardList() {
  const pathName = usePathname();
  const isHomeActive = pathName === PATH.MY_DASHBOARD;
  const { openDashboardCreateModal, dashboardListVersion } = useDashboardCreateModal();
  const { dashboards, isLoading, error, lastItemRef, scrollContainerRef } =
    useDashboards(dashboardListVersion);
  const { pinnedIds, togglePin, isPinned } = usePinnedDashboards();

  const { pinnedDashboards, unpinnedDashboards } = useMemo(() => {
    const pinned = dashboards.filter((d) => isPinned(d.id));

    pinned.sort((a, b) => pinnedIds.indexOf(a.id) - pinnedIds.indexOf(b.id));
    const unpinned = dashboards.filter((d) => !isPinned(d.id));
    return { pinnedDashboards: pinned, unpinnedDashboards: unpinned };
  }, [dashboards, pinnedIds, isPinned]);

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

      <div ref={scrollContainerRef} className={`${styles.menus} custom-scrollbar`}>
        {isLoading ? <p className={styles.statusText}>대시보드를 불러오는 중</p> : null}
        {error ? <p className={styles.statusText}>{error}</p> : null}
        {!isLoading && !error && dashboards.length === 0 ? (
          <p className={styles.statusText}>대시보드가 없습니다</p>
        ) : null}

        {pinnedDashboards.length > 0 && (
          <div className={styles.pinnedSection}>
            {pinnedDashboards.map((dashboard) => (
              <DashBoardItem
                key={dashboard.id}
                id={dashboard.id}
                title={dashboard.title}
                color={dashboard.color}
                createdByMe={dashboard.createdByMe}
                pinned
                onTogglePin={togglePin}
              />
            ))}
          </div>
        )}

        {unpinnedDashboards.map((dashboard) => (
          <DashBoardItem
            key={dashboard.id}
            id={dashboard.id}
            title={dashboard.title}
            color={dashboard.color}
            createdByMe={dashboard.createdByMe}
            pinned={false}
            onTogglePin={togglePin}
          />
        ))}

        <div ref={lastItemRef} />
      </div>
    </div>
  );
}
