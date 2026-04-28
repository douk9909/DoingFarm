import Image from 'next/image';
import myboardBg from '@/assets/backgroundImg/myboard_bg.svg';
import myboard from '@/assets/backgroundImg/myboard.svg';
import styles from './page.module.css';
import DashBoardHeader from './components/DashboardHeader';
import ColumnList from './components/ColumnList';

interface DashboardDetailPageProps {
  params: Promise<{
    dashboardId: string;
  }>;
}

export default async function DashboardDetailPage({ params }: DashboardDetailPageProps) {
  const { dashboardId } = await params;
  const id = Number(dashboardId);

  return (
    <section className={styles.container}>
      <div className={styles.bgWrapper}>
        <Image src={myboardBg} alt="" fill className={styles.bgImage} />
        <div className={styles.bgOverlay} />
        <Image src={myboard} alt="" className={styles.characterImage} />
      </div>

      <div className={styles.content}>
        {/* Todo - api 연동 후 변경 */}
        <DashBoardHeader dashboardId={id} />
        <ColumnList dashboardId={id} />
      </div>
    </section>
  );
}
