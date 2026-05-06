# Skills

Do!ngFarm 프로젝트에서 실제로 사용한 기술과 구현 경험을 정리한 문서입니다.

## Frontend

- HTML5 / CSS3 기반 마크업과 반응형 레이아웃 구현
- TypeScript 기반 React 컴포넌트 개발
- Next.js 16 App Router 기반 페이지, 레이아웃, 라우트 그룹 구성
- Server Component와 Client Component 역할 분리
- Dynamic Route를 활용한 대시보드 상세/관리 페이지 구현

## Routing & Pages

- `/`: 랜딩 페이지
- `/login`, `/signup`: 인증 페이지
- `/mydashboard`: 내 대시보드와 초대 받은 대시보드
- `/dashboard/[dashboardId]`: 대시보드 상세 작업 보드
- `/dashboard/[dashboardId]/edit`: 대시보드 설정, 구성원, 초대 내역 관리
- `/mypage`: 프로필과 비밀번호 관리
- `/api/github-webhook`: GitHub 이벤트 수신 API route

## UI Components

- 공통 컴포넌트 설계
  - Button
  - Input
  - Modal
  - ConfirmModal
  - DropDownMenu
  - Avatar
  - Card
  - LoadingSpinner
  - Skeleton
  - ColorPicker
- 대시보드 기능 컴포넌트 구현
  - 대시보드 생성 모달
  - 초대 모달
  - 할 일 생성/수정/상세 모달
  - 할 일 입력 폼
  - 댓글 작성 폼
- 레이아웃 컴포넌트 구현
  - Navbar
  - Sidebar
  - 반응형 모바일 사이드바
  - 사이드바 너비 저장 및 복원

## Styling

- CSS Modules 기반 컴포넌트 단위 스타일링
- `reset.css`, `global.css`, `tokens.css`, `typography.css`를 활용한 전역 스타일 구성
- Design Token 기반 색상, 간격, 폰트 스타일 관리
- 모바일/태블릿/데스크톱 화면을 고려한 반응형 UI 구현
- Skeleton UI와 Loading UI를 통한 비동기 상태 표현

## API & Data

- Axios 인스턴스 기반 REST API 통신 구조 설계
- 도메인별 API 모듈 분리
  - auth
  - user
  - dashboard
  - column
  - card
  - comment
  - member
  - invitation
- Server Component용 fetch client 구성
- 클라이언트 요청과 서버 요청의 인증 흐름 분리
- 카드 이미지, 프로필 이미지 업로드를 위한 multipart/form-data 처리
- 페이지네이션과 무한 스크롤 데이터 조회 구현

## Authentication

- Access Token 기반 인증 처리
- localStorage와 cookie에 access token 저장
- Axios request interceptor로 인증 헤더 자동 주입
- 401 응답 시 토큰 제거 후 로그인 페이지로 이동
- Server Component에서 cookie token을 읽어 인증 요청 수행

## State & Hooks

- React Hooks 기반 화면 상태 관리
  - `useState`
  - `useEffect`
  - `useMemo`
  - `useCallback`
  - `useRef`
- 데이터 조회/변경 로직을 Custom Hook으로 분리
  - `useFetch`
  - `useDashboards`
  - `useReceivedInvitations`
  - `useInfiniteScroll`
  - `usePagination`
  - `useMemberList`
  - `useCreateCardWithImage`
  - `useUpdateCardWithImage`
  - `useGenericDelete`
- UI 편의 로직 분리
  - `useIsMobile`
  - `usePinnedDashboards`
  - `useTodoImagePreview`
  - `useTodoTags`

## Interaction

- `@dnd-kit/core` 기반 카드 드래그 앤 드롭 구현
- 컬럼 간 카드 이동과 DragOverlay 처리
- DatePicker 기반 마감일/시간 선택 UI 구현
- Toast를 활용한 성공/실패 피드백 처리
- 모달 기반 생성, 상세 보기, 수정 플로우 구성
- 검색, 페이지네이션, 무한 스크롤 인터랙션 구현

## Architecture

- `src/app` 중심의 App Router 구조 구성
- `(auth)`, `(with-nav)` Route Group으로 레이아웃 분리
- `components`, `hooks`, `lib`, `types`, `styles`, `assets` 역할 분리
- API 요청 함수와 UI 컴포넌트 책임 분리
- 타입 정의를 `src/types`에 모아 도메인 모델 관리
- 상수와 유틸 함수를 `src/lib` 하위로 분리

## Tools & Quality

- Git / GitHub 기반 버전 관리
- ESLint 기반 정적 검사
- Prettier 기반 코드 포맷팅
- TypeScript strict 모드 기반 타입 안정성 관리
- `@/*` path alias를 활용한 import 경로 정리
- GitHub Pull Request 기반 협업 흐름

## Deployment & Integration

- Next.js 이미지 최적화를 위한 remote image domain 설정
- AWS S3 이미지 리소스 연동
- GitHub PR/push 이벤트를 Discord webhook으로 전달하는 API route 구현
- 환경 변수 기반 API 서버 및 webhook URL 관리
