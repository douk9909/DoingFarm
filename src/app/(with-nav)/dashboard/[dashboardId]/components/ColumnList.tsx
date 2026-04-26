import Column from './Column';
import styles from './ColumnList.module.css';

export default async function ColumnList({ dashboardId }: { dashboardId: number }) {
  // api 연동 후 fetch
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
  );
}
