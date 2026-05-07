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

export interface PolicySection {
  readonly id: number;
  readonly title: string;
  readonly content: string;
  readonly subList?: readonly string[];
}

// 2. 전체 정책 데이터 구조 타입
export interface PrivacyPolicyData {
  readonly version: string;
  readonly title: string;
  readonly description: string;
  readonly updatedAt: string;
  readonly sections: readonly PolicySection[];
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
    title: ['인스타그램에서', '업데이트 소식을 받아보세요'],
    description: [
      '두잉팜 인스타그램에서 업데이트 소식과 공지,',
      '서비스 관련 이야기를 가장 빠르게 확인할 수 있어요',
    ],
  },
] as const satisfies readonly [FeatureContent, FeatureContent, FeatureContent, FeatureContent];

export const landingFooterLinks = ['Privacy Policy', 'FAQ'] as const;

export const privacyPolicy = {
  version: '1.0.0',
  title: '개인정보 처리방침',
  description:
    '본 개인정보 처리방침은 서비스 이용 과정에서 수집되는 이용자의 개인정보를 보호하고, 서비스 이용과 관련된 정보 처리 기준을 안내하기 위해 작성되었습니다. 두잉팜(이하 “서비스”)은 이용자의 개인정보를 중요하게 생각하며, 보다 안전하고 원활한 서비스 제공을 위해 개인정보를 관리하고 있습니다.',
  updatedAt: '2026.05.08',
  sections: [
    {
      id: 1,
      title: '제1조 (개인정보 수집 항목)',
      content: '두잉팜은 원활한 일정 관리를 위해 최소한의 정보만 수집합니다.',
      subList: [
        '가입 정보: 이메일, 닉네임, 비밀번호',
        '활동 정보: 생성한 대시보드 이름, 할 일 카드 제목 및 상세 내용',
        '멀티미디어: 카드에 직접 업로드한 이미지 파일',
        '자동 기록: 서비스 개선을 위한 접속 로그 및 기기 정보',
      ],
    },
    {
      id: 2,
      title: '제2조 (개인정보 이용 목적)',
      content: '두잉팜의 모든 정보는 여러분의 편리한 일정 관리를 위해서만 사용됩니다.',
      subList: [
        '협업 기능: 내가 소속된 팀 대시보드에서 다른 팀원에게 내 닉네임과 프로필 노출',
        '진척도 관리: 내가 생성하거나 배정받은 할 일의 상태 변화 기록',
        '서비스 개선: 더 쾌적한 농장 환경(UI/UX)을 만들기 위한 통계 분석',
      ],
    },
    {
      id: 3,
      title: '제3조 (정보 공개 범위)',
      content:
        '개인 대시보드의 내용은 본인만 볼 수 있지만, 팀 대시보드에 등록된 내용은 함께하는 팀원들에게만 공유됩니다. 외부에는 절대 공개되지 않으니 안심하세요!',
    },
    {
      id: 4,
      title: '제4조 (정보의 보관 및 삭제)',
      content: '두잉팜은 프로젝트 기간 동안 여러분의 데이터를 소중히 보관합니다.',
      subList: [
        '보관 기간: 서비스 운영 및 프로젝트 피드백 기간 동안 유지됩니다.',
        '삭제 안내: 현재 서비스 내 자동 탈퇴 기능은 준비 중입니다.',
        '삭제 요청: 내 정보를 삭제하고 싶으신 경우, 하단의 관리자 메일로 요청해 주시면 확인 후 지체 없이 모든 데이터를 수거(삭제)해 드립니다.',
      ],
    },
    {
      id: 5,
      title: '제5조 (면책 조항)',
      content: '본 서비스는 부트캠프 학습 목적으로 제작된 포트폴리오 프로젝트입니다.',
      subList: [
        '실제 상용 서비스와 같은 수준의 보안 및 법적 보장을 제공하지 않습니다.',
        '중요한 개인 정보나 실제 업무용 데이터보다는 테스트용 데이터 사용을 권장합니다.',
        '서버 환경에 따라 예고 없이 데이터가 초기화될 수 있음을 알려드립니다.',
      ],
    },
    {
      id: 6,
      title: '관리자에게 연락하기',
      content:
        '서비스 이용 중 불편한 점이 있거나 내 정보를 바로 삭제하고 싶다면 언제든 말씀해주세요.',
      subList: ['관리자: PART03_TEAM01', 'GitHub: https://github.com/douk9909/DoingFarm'],
    },
  ],
} as const;
