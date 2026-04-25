import type { StaticImageData } from 'next/image';
import dashboardBoxImage from '@/assets/character/empty_box.svg';
import dashboardCarrotImage from '@/assets/character/empty_carrot.svg';

export interface DashboardEmptySection {
  title: string;
  message: string;
  image: StaticImageData;
  imageAlt: string;
  actionLabel?: string;
  hideTitle?: boolean;
  priority?: boolean;
}

interface DashboardPageContent {
  breadcrumb: string;
  pageTitle: string;
  sections: readonly DashboardEmptySection[];
}

export const dashboardPageContent: DashboardPageContent = {
  breadcrumb: '홈',
  pageTitle: '내 대시보드',
  sections: [
    {
      title: '내 대시보드',
      message: '대시보드가 없습니다.',
      image: dashboardBoxImage,
      imageAlt: '대시보드 박스',
      actionLabel: '생성하기',
      hideTitle: true,
      priority: true,
    },
    {
      title: '초대 받은 대시보드',
      message: '아직 초대받은 대시보드가 없습니다.',
      image: dashboardCarrotImage,
      imageAlt: '초대 받은 대시보드 캐릭터',
    },
  ],
} as const;
