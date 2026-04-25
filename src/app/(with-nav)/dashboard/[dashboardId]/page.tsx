import Image from 'next/image';
import myboardBg from '@/assets/backgroundImg/myboard_bg.svg';
import myboard from '@/assets/backgroundImg/myboard.svg';
import styles from './page.module.css';
import DashBoardHeader from './components/DashboardHeader';
import ColumnList from './components/ColumnList';

interface DashboardDetailPageProps {
  params: Promise<{
    dashboardId: number;
  }>;
}

export default async function DashboardDetailPage({ params }: DashboardDetailPageProps) {
  const { dashboardId } = await params;

  return (
    <section className={styles.container}>
      <div className={styles.bgWrapper}>
        <Image src={myboardBg} alt="" fill className={styles.bgImage} />
        <div className={styles.bgOverlay} />
        <Image src={myboard} alt="" className={styles.characterImage} />
      </div>

      <div className={styles.content}>
        <DashBoardHeader title="포트폴리오" color="red" />
        <ColumnList dashboardId={dashboardId} />
      </div>
    </section>
  );
}
