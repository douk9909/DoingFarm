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

export interface PrivacyPolicyData {
  readonly version: string;
  readonly title: string;
  readonly description: string;
  readonly updatedAt: string;
  readonly sections: readonly PolicySection[];
}

export interface FaqItem {
  readonly id: number;
  readonly question: string;
  readonly answer: string;
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

export const landingFooterLinks = [
  { label: 'Privacy Policy', href: '/policy/privacy' },
  { label: 'FAQ', href: '/policy/faq' },
] as const;

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

export const faqContent = {
  title: '자주 묻는 질문',
  description: '두잉팜 이용에 대해 궁금한 점을 확인해 보세요.',
  items: [
    {
      id: 1,
      question: '[로그인] 두잉팜 로그인 방법이 궁금해요.',
      answer:
        '두잉팜은 별도의 복잡한 절차 없이 이메일 계정으로 간편하게 시작할 수 있습니다. \n\n1. [회원가입] 페이지에서 사용하실 이메일과 멋진 닉네임, 비밀번호를 설정하여 계정을 생성해 주세요. \n2. 가입이 완료되면 [로그인] 페이지에서 등록하신 이메일과 비밀번호를 입력하여 나만의 농장(대시보드)으로 입장하실 수 있습니다. \n3. 만약 로그인이 되지 않는다면, 이메일 형식이나 비밀번호 대소문자를 다시 한번 확인 부탁드립니다.',
    },
    {
      id: 2,
      question: '[협업] 친구나 동료를 대시보드에 초대하고 싶어요.',
      answer:
        '협업하고 싶은 대시보드를 선택한 후, 상단 네비게이션 바에 [초대] 버튼을 클락하면 초대하기 모달이 뜹니다. 함께 대시보드를 가꾸고 싶은 동료의 이메일을 입력하여 초대하면, 해당 대시보드에서 실시간으로 할 일을 나누고 댓글로 소통할 수 있습니다.',
    },
    {
      id: 3,
      title: '[협업] 팀원을 초대하면 어떤 것을 함께 할 수 있나요?',
      answer:
        '팀원을 초대하면 하나의 대시보드를 공동으로 관리하게 됩니다.\n\n- 동일한 할 일 목록을 실시간으로 확인하고 수정할 수 있습니다.\n- 카드마다 댓글을 달아 작업에 대한 피드백을 주고받을 수 있습니다.\n- 각 카드에 담당자를 지정하여 책임 소재를 명확히 할 수 있습니다.',
    },
    {
      id: 4,
      question: '[기능] 대시보드나 할 일을 수정/삭제하고 싶어요.',
      answer:
        '모든 대시보드와 할 일 카드는 대시보드 멤버라면 언제든 수정이 가능합니다. 카드 상세 보기 내의 [...] 버튼을 클릭하면 나타나는 수정/삭제 버튼을 활용해 보세요. 단, 삭제된 데이터는 프로젝트 특성상 복구가 어려울 수 있으니 신중하게 결정해 주세요!',
    },
    {
      id: 5,
      question: '[이미지] 할 일 카드에 사진은 어떻게 등록하나요?',
      answer:
        '대시보드의 각 컬럼 밑에 할 일 카드를 추가하는 버튼[+]이 있습니다. 해당 버튼을 클릭하면 할 일을 생성하는 모달이 뜨며 [+image upload] 버튼을 통해 사용자의 로컬 기기에 있는 사진을 선택할 수 있습니다. 등록된 사진은 카드의 썸네일로 노출되어, 어떤 작업인지 한눈에 파악하기 쉽게 도와줍니다.',
    },
    {
      id: 6,
      title: '[상태관리] 할 일의 상태(To-do, Done 등)는 어떻게 바꾸나요?',
      answer:
        '두잉팜은 칸반 보드 시스템을 따르고 있습니다.\n\n작업이 완료되었거나 상태가 변경되었다면, 할 일 카드를 클릭하여 상세 페이지에서 상태(Column)를 변경하거나 할 일 카드를 클릭한 채로 원하는 컬럼 위로 끌어다 놓으세요. 상태를 변경하면 해당 컬럼으로 카드가 자동으로 이동하여 팀원들이 진행 상황을 즉시 파악할 수 있습니다.',
    },
    {
      id: 7,
      title: '[대시보드] 자주 가는 대시보드를 고정하고 싶어요.',
      answer:
        '자주 확인하는 대시보드는 사이드바의 [고정(Pin)] 기능을 활용해 최상단에 배치할 수 있습니다.\n\n- 사이드 바 대시보드 목록에서 중요하거나 자주 방문하는 대시보드의 핀 아이콘을 클릭해 보세요.\n- 고정된 대시보드는 목록 가장 위에 모여 보여지므로, 여러 프로젝트를 진행 중일 때 빠르게 이동하며 관리할 수 있어 편리합니다.',
    },
    {
      id: 8,
      title: '[필터링] 할 일이 너무 많은데, 특정 카드만 골라볼 수 있나요?',
      answer:
        '네, 강력한 필터링 기능을 활용해 보세요!\n\n1. [태그/담당자 필터]: 특정 태그가 붙은 카드나 내가 담당하고 있는 작업들만 모아볼 수 있습니다.\n\n수많은 할 일 속에서도 길을 잃지 않고, 지금 당장 집중해야 할 작업들만 쏙쏙 골라내어 대시보드를 효율적으로 관리해 보세요!',
    },
  ],
} as const;
