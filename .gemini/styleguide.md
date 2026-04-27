# Gemini 코드리뷰 스타일 가이드

## Language

- 모든 코드 리뷰 코멘트는 한국어로 작성해 주세요.
- 초보 개발자도 이해할 수 있게 쉽게 설명해 주세요.
- 코드, 파일명, 함수명, 변수명, 라이브러리명은 영어 원문을 유지해 주세요.
- 실무 코드리뷰처럼 친절하지만 명확하게 작성해 주세요.
- 단순 취향보다 버그, 유지보수성, 성능, 접근성, 팀 컨벤션 위주로 리뷰해 주세요.

---

## Project Context

- 프로젝트명은 DoingFarm입니다.
- Next.js App Router 기반 프로젝트입니다.
- 기술 스택은 Next.js, React, TypeScript입니다.
- Styling은 CSS Modules를 사용합니다.
- API 요청은 Axios를 사용합니다.
- 인증은 JWT와 Axios Interceptor를 사용합니다.
- 협업 도구는 GitHub, Linear, Notion, Figma를 사용합니다.
- 코드 품질 관리는 ESLint, Prettier를 사용합니다.
- 패키지 매니저는 npm을 사용합니다.
- 배포는 AWS S3와 AWS CloudFront를 기준으로 검토합니다.

---

## Review Priority

다음 순서로 중요도를 두고 리뷰해 주세요.

1. 버그 가능성
2. 인증/토큰 처리 문제
3. API 요청/응답 처리 문제
4. 유지보수성
5. 성능
6. 접근성
7. 팀 컨벤션 위반
8. 단순 스타일

---

## Folder Structure Convention

프로젝트는 다음 구조를 기준으로 리뷰해 주세요.

- `src/assets/backgroundImg` : 배경 이미지 에셋
- `src/assets/character` : 캐릭터 이미지 에셋
- `src/assets/hashTags` : 해시태그 이미지 에셋
- `src/assets/icon`, `src/assets/icons` : SVG 아이콘 에셋과 React 아이콘 컴포넌트
- `src/assets/logo` : 로고 이미지 에셋
- `src/assets/mainImg` : 랜딩/메인 화면 이미지 에셋
- `src/app` : App Router 기반 페이지, 라우트 그룹, 레이아웃
- `src/app/api` : Route Handler 기반 API 엔드포인트
- `src/components/common` : 공통 UI 컴포넌트
- `src/components/layout` : Navbar, Sidebar 등 레이아웃 컴포넌트
- `src/components/landing` : 랜딩 페이지 전용 컴포넌트
- `src/components/dashboard` : 대시보드 도메인 컴포넌트가 추가될 위치
- `src/components/card` : 카드 도메인 컴포넌트가 추가될 위치
- `src/components/column` : 컬럼 도메인 컴포넌트가 추가될 위치
- `src/hooks/queries` : 조회 관련 커스텀 훅
- `src/hooks/mutations` : 생성, 수정, 삭제 관련 커스텀 훅
- `src/hooks/ui` : UI 상태 관련 커스텀 훅
- `src/lib/api` : Axios API 함수
- `src/lib/constants` : 상수
- `src/lib/utils` : 유틸 함수
- `src/providers` : 전역 Provider
- `src/styles` : 전역 스타일, 디자인 토큰
- `src/types` : 타입 정의

---

## App Router Convention

- `page.tsx`에는 페이지 조합 역할을 우선해 주세요.
- 페이지 내부에 비즈니스 로직이 과하게 들어가면 분리를 제안해 주세요.
- 라우트 그룹 `(auth)`, `(with-nav)` 구조를 유지해 주세요.
- 로그인/회원가입 페이지는 `(auth)` 그룹 아래에 위치해야 합니다.
- 내 대시보드, 마이페이지, 대시보드 상세 페이지는 `(with-nav)` 그룹 아래에 위치해야 합니다.
- 공통 네비게이션이 필요한 페이지는 `(with-nav)/layout.tsx`를 활용하는 구조를 권장해 주세요.

---

## Component Convention

- 공통 컴포넌트는 `src/components/common`에 위치해야 합니다.
- Button, Input, Modal, Dropdown, Avatar처럼 재사용 가능한 컴포넌트는 common에 분리해 주세요.
- Navbar, Sidebar 같은 레이아웃 컴포넌트는 `src/components/layout`에 위치해야 합니다.
- 랜딩 페이지에서만 쓰는 컴포넌트는 `src/components/landing`에 위치해야 합니다.
- 도메인 성격이 강한 컴포넌트는 `dashboard`, `card`, `column` 폴더에 맞게 분리해 주세요.
- 현재 비어 있는 도메인 폴더를 사용할 때는 실제 사용처와 책임이 명확한지 함께 확인해 주세요.
- 컴포넌트는 하나의 책임만 가지도록 리뷰해 주세요.
- JSX가 너무 길거나 복잡하면 컴포넌트 분리를 제안해 주세요.

---

## CSS Modules Convention

- 스타일링은 CSS Modules를 기준으로 리뷰해 주세요.
- 컴포넌트 파일과 CSS Module 파일은 같은 폴더에 함께 위치해야 합니다.
  - 예: `Button.tsx`
  - 예: `Button.module.css`
- 전역 스타일은 `src/styles/global.css`, `src/styles/tokens.css`, `src/styles/typography.css`, `src/styles/reset.css`의 역할에 맞게 작성하는 것을 권장해 주세요.
- CSS Module 클래스명은 의미가 명확해야 합니다.
- 반응형은 모바일, 태블릿, 데스크탑 기준으로 고려해 주세요.
- 불필요한 inline style 사용은 지양해 주세요.
- 중복되는 색상은 `tokens.css`, font-family/font-size/font-weight는 `typography.css` 활용을 제안해 주세요.

---

## TypeScript Convention

- `any` 사용은 지양해 주세요.
- 불가피하게 `any`를 사용하는 경우 이유가 명확해야 합니다.
- API 응답 타입은 `src/types`에 정의하는 것을 권장해 주세요.
- props 타입은 명확하게 정의해 주세요.
- optional 값은 안전하게 처리해 주세요.
- 사용하지 않는 타입, 변수, import는 제거해 주세요.

---

## API & Axios Convention

- API 요청 함수는 `src/lib/api` 아래에 도메인별로 분리해 주세요.
  - `auth.ts`
  - `dashboard.ts`
  - `column.ts`
  - `card.ts`
  - `comment.ts`
  - `user.ts`
- Axios 기본 설정은 `client.ts`에서 관리하는 구조를 유지해 주세요.
- API 호출 로직이 컴포넌트 안에 직접 길게 들어가면 분리를 제안해 주세요.
- loading, error, empty 상태 처리를 확인해 주세요.
- API 응답 데이터의 null/undefined 가능성을 안전하게 처리했는지 확인해 주세요.
- 에러 메시지는 사용자가 이해할 수 있는 형태인지 확인해 주세요.

---

## Authentication Convention

- JWT 토큰 처리는 일관된 방식으로 관리해 주세요.
- Axios Interceptor에서 토큰을 주입하는 구조를 우선 고려해 주세요.
- 토큰 관련 로직이 여러 파일에 중복되면 분리를 제안해 주세요.
- 인증이 필요한 API와 필요 없는 API가 명확히 구분되어야 합니다.
- 토큰 만료, 인증 실패 상황에 대한 처리를 확인해 주세요.

---

## Hooks Convention

- 조회 관련 훅은 `src/hooks/queries`에 위치해야 합니다.
- 생성, 수정, 삭제 관련 훅은 `src/hooks/mutations`에 위치해야 합니다.
- UI 상태 관련 훅은 `src/hooks/ui`에 위치해야 합니다.
- 커스텀 훅 이름은 `use`로 시작해야 합니다.
- 훅 내부의 책임이 너무 많으면 분리를 제안해 주세요.

---

## Constants & Utils Convention

- 라우트 경로는 `src/lib/constants/path.ts`에서 관리하는 것을 권장해 주세요.
- query key는 `src/lib/constants/queryKey.ts`에서 관리하는 것을 권장해 주세요.
- 날짜 포맷은 `formatDate.ts` 같은 유틸 함수를 활용해 주세요.
- storage 관련 로직은 `storage.ts`에서 관리하는 것을 권장해 주세요.
- 같은 문자열, 숫자, 경로가 반복되면 상수화를 제안해 주세요.

---

## Naming Convention

- 컴포넌트명은 PascalCase를 사용해 주세요.
  - 예: `Button`, `Navbar`, `DashboardCard`
- 변수명과 함수명은 camelCase를 사용해 주세요.
  - 예: `dashboardId`, `handleClick`
- boolean 값은 의미가 드러나도록 작성해 주세요.
  - 예: `isLoading`, `hasError`, `canEdit`
- 파일명은 기존 프로젝트 구조를 따르되 컴포넌트 파일은 PascalCase를 유지해 주세요.
  - 예: `Button.tsx`
  - 예: `Button.module.css`

---

## Accessibility

- 이미지에는 적절한 `alt` 속성을 작성해 주세요.
- 클릭 가능한 요소가 버튼 역할이면 `button` 태그 사용을 권장해 주세요.
- 페이지 이동 목적이면 `Link` 사용을 권장해 주세요.
- 키보드 접근성을 고려해 주세요.
- 중요한 정보를 색상에만 의존하지 않도록 해 주세요.

---

## Code Quality

- 사용하지 않는 코드, 주석, `console.log`는 제거해 주세요.
- 중복 로직은 함수나 컴포넌트로 분리하는 것을 제안해 주세요.
- 의미 없는 변수명은 지양해 주세요.
  - 예: `data`, `temp`, `item`만 단독으로 남용하지 않기
- 복잡한 조건문은 읽기 쉽게 분리하는 것을 권장해 주세요.
- 컴포넌트가 너무 커지면 역할별 분리를 제안해 주세요.

---

## Branch Convention

브랜치 전략은 다음 기준을 따릅니다.

- `main` : 실제 배포 브랜치
- `develop` : 개발 통합 브랜치
- `feature/*` : 새로운 기능 개발 브랜치
- `hotfix/*` : main 기준 긴급 버그 수정 브랜치
- `refactor/*` : 리팩토링 브랜치
- `docs/*` : 문서 수정 브랜치

리뷰 시 브랜치 목적과 PR 내용이 일치하는지 확인해 주세요.

---

## Commit Convention

커밋 메시지는 다음 규칙을 따릅니다.

- `feat`: 새로운 기능 추가
- `fix`: 버그 수정
- `docs`: 문서 수정
- `style`: 코드 포맷팅, 세미콜론 누락 등 코드 변경 없는 경우
- `refactor`: 코드 리팩토링
- `test`: 테스트 코드 추가
- `chore`: 빌드 업무 수정, 패키지 매니저 설정 등

커밋은 작게 나누어 자주 작성하는 것을 권장해 주세요.

---

## PR Review Convention

- PR은 하나의 목적에 집중하는 것을 권장해 주세요.
- PR 설명과 실제 변경 내용이 일치하는지 확인해 주세요.
- 리뷰 코멘트는 문제, 이유, 개선 방향 순서로 작성해 주세요.
- 단순 취향 차이는 blocking 하지 말고 제안 정도로 남겨 주세요.
- 중요한 문제는 명확하게 수정 요청해 주세요.

---

## Must Review

다음 항목은 발견 시 반드시 리뷰해 주세요.

- `any` 사용
- `console.log` 제거 누락
- 사용하지 않는 import
- loading/error/empty 상태 누락
- 인증 토큰 처리 중복
- Axios 요청 로직이 컴포넌트에 과하게 들어간 경우
- CSS Module이 아닌 inline style 남용
- 반응형 깨짐 가능성
- `alt` 누락
- 브랜치/커밋 컨벤션 위반
