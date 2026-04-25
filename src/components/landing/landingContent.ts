import { PATH } from '@/lib/constants/path';

export interface LandingNavItem {
  href: string;
  label: string;
}

export interface FeatureContent {
  label: string;
  title: readonly [string, string];
  description: readonly [string, string];
}

export const landingNavItems = [
  { href: PATH.LOGIN, label: '로그인' },
  { href: PATH.SIGNUP, label: '회원가입' },
] as const satisfies readonly LandingNavItem[];

export const landingHeroContent = {
  titleLine: '더 새로운 일정 관리',
  titleAccent: '할일농장',
  signupLabel: '회원가입 하기',
  loginLabel: '로그인하기',
} as const;

export const landingFeatureContents = [
  {
    label: 'Point 1',
    title: ['내가 등록한 사진으로', '더 기억에 남는 할 일 리스트'],
    description: [
      '카드 내 추가한 이미지를 상단 썸네일로 노출하여',
      '작업에 대한 내용을 더 직관적으로 떠올릴 수 있어요',
    ],
  },
  {
    label: 'Point 2',
    title: ['자세한 정보는 명확하게,', '팀 논의는 빠르게 확인하세요'],
    description: [
      '작업에 필요한 세부 내용을 손쉽게 정리하고,',
      '댓글을 통해 팀원들과 빠르게 소통해보세요',
    ],
  },
  {
    label: 'Point 3',
    title: ['나에게 맞게, 더 효율적으로', '생산성을 높이는 다양한 설정'],
    description: [
      '작업 방식에 맞게 색상, 팀원, 구성원 등을 쉽게 관리할 수 있어요',
      '환경을 조율하면 할 일에 더 가볍고 빠르게 다가갈 수 있습니다',
    ],
  },
  {
    label: 'Point 4',
    title: ['인스타그램에서 업데이트 소식을', '받아보세요'],
    description: [
      '두잉팜 인스타그램에서 업데이트 소식과 공지,',
      '서비스 관련 이야기를 가장 빠르게 확인할 수 있어요',
    ],
  },
] as const satisfies readonly [FeatureContent, FeatureContent, FeatureContent, FeatureContent];

export const landingFooterLinks = ['Privacy Policy', 'FAQ'] as const;
