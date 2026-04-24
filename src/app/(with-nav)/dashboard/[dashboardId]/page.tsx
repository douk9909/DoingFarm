import Image from 'next/image';
import myboardBg from '@/assets/backgroundImg/myboard_bg.svg';
import myboard from '@/assets/backgroundImg/myboard.svg';
import styles from './page.module.css';
import DashBoardHeader from './components/DashboardHeader';
import Column from './components/Column';

interface DashboardDetailPageProps {
  params: Promise<{
    dashboardId: string;
  }>;
}

export default async function DashboardDetailPage({ params }: DashboardDetailPageProps) {
  const { dashboardId } = await params;

  const mockColumns = [
    {
      id: 1,
      title: 'To-do',
      totalCount: 3,
      cards: [
        {
          id: 1,
          title: '기능 설정',
          tags: ['프로젝트', '상'],
          dueDate: '2025-07-12',
          assignee: { nickname: '박민영', profileImage: null },
          src: null,
        },
        {
          id: 2,
          title: '레퍼런스 찾기',
          tags: ['프로젝트', '디자인', '상'],
          dueDate: '2025-07-18',
          assignee: { nickname: '박민영', profileImage: null },
          src: null,
        },
        {
          id: 3,
          title: 'GUI 디자인',
          tags: ['프로젝트', '디자인', '상'],
          dueDate: '2025-07-20',
          assignee: { nickname: '박민영', profileImage: null },
          src: null,
        },
      ],
    },
    {
      id: 2,
      title: 'On Progress',
      totalCount: 1,
      cards: [
        {
          id: 4,
          title: '와이어프레임 만들기',
          tags: ['프로젝트', '디자인', '상'],
          dueDate: '2025-07-17',
          assignee: { nickname: '박민영', profileImage: null },
          src: null,
        },
      ],
    },
    {
      id: 3,
      title: 'Done',
      totalCount: 2,
      cards: [
        {
          id: 5,
          title: '프로젝트 기획',
          tags: ['프로젝트', '디자인', '상'],
          dueDate: '2025-07-01',
          assignee: { nickname: '박민영', profileImage: null },
          src: null,
        },
        {
          id: 6,
          title: '프로젝트 주제 정하기',
          tags: ['프로젝트'],
          dueDate: '2025-06-30',
          assignee: { nickname: '박민영', profileImage: null },
          src: null,
        },
      ],
    },
  ];

  return (
    <section className={styles.container}>
      <div className={styles.bgWrapper}>
        <Image src={myboardBg} alt="" fill className={styles.bgImage} />
        <div className={styles.bgOverlay} />
        <Image src={myboard} alt="" className={styles.characterImage} />
      </div>

      <div className={styles.content}>
        <DashBoardHeader title="포트폴리오" color="red" />
        <div className={styles.columnList}>
          {mockColumns.map((column) => (
            <Column
              key={column.id}
              id={column.id}
              title={column.title}
              cards={column.cards}
              totalCount={column.totalCount}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
