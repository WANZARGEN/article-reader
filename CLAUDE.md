# Claude 개발 가이드라인

이 문서는 Article Reader 프로젝트 개발 시 Claude가 따라야 할 가이드라인을 정의합니다.

## 🚫 개발 환경 관리

### 개발 서버
- **절대 개발 서버를 임의로 실행하거나 종료하지 말 것**
- 사용자가 별도로 개발 서버를 관리하고 있음
- `pnpm dev`, `pkill` 등 서버 관련 명령어 사용 금지

### 포트 및 프로세스
- 현재 개발 서버는 포트 3001에서 실행 중
- 프로세스 관리는 사용자가 직접 담당

## 📦 기술 스택 및 패키지 관리

### 현재 확정된 기술 스택
- **Frontend**: Next.js 15 + React 19 + TypeScript
- **Styling**: Tailwind CSS v4 (zero config)
- **UI Components**: shadcn/ui + Radix UI
- **Forms**: React Hook Form + Zod
- **Testing**: Jest + Testing Library
- **Database**: Prisma + SQLite
- **AI**: Claude API (Anthropic)
- **Package Manager**: pnpm

## 🎨 코딩 스타일 및 아키텍처

### Export 방식
- **page.tsx, layout.tsx**: default export 사용
- **나머지 모든 파일**: named export 사용

### 컴포넌트 구조
- 재사용 가능한 공통 스타일 토큰 활용 (`components/ui/common.tsx`)
- 일관된 디자인 시스템 유지
- 접근성(a11y) 고려 (cursor-pointer, focus states 등)

### 파일 구조
- **lib/**: 비즈니스 로직, 기능별 분류
- **components/**: UI 컴포넌트
- **app/**: Next.js App Router
- **index.ts**: 단순 re-export만, 구현체는 별도 파일
- **테스트**: 소스 코드와 같은 위치

## 📝 Git 및 커밋 관리

### 커밋 메시지
- **Conventional Commits** 형식 사용
- **간결하고 핵심적인 내용만** 포함
- 장황한 설명 금지
- 한국어로 작성

### 커밋 분할
- 논리적 단위로 커밋 분할
- 각 커밋은 명확한 목적을 가져야 함
- 대규모 변경사항은 여러 커밋으로 분할

### CSS 스타일링 관련
- `style:` 타입은 코드 포맷팅용 (세미콜론, 들여쓰기 등)
- UI 스타일링 변경은 `feat:`, `fix:` 또는 `refactor:` 사용

## 🔍 개발 프로세스

### 답변 스타일
- **간결하고 직접적으로** 답변
- 불필요한 전후 설명 최소화
- 4줄 이내로 응답 (도구 사용 및 코드 생성 제외)
- 구체적 질문에는 구체적 답변

### 파일 탐색 및 검색
- 키워드 검색 시 **Task 도구** 우선 사용
- 특정 파일 경로 알 때는 **Read/Glob 도구** 직접 사용
- 병렬 도구 호출로 성능 최적화

### 에러 처리
- TypeScript 에러 발생 시 즉시 수정
- `pnpm typecheck` 실행하여 검증
- 사용자에게 보고 후 수정 진행

## 🎯 프로젝트 목표

### 핵심 기능
1. URL/파일/텍스트에서 콘텐츠 추출
2. 텍스트를 마크다운으로 구조화
3. 영문-한글 번역 (단락별 토글)
4. AI 기반 아티클 분류
5. 퀴즈 생성 및 읽기 통계

## ⚠️ 핵심 원칙

1. **새로운 기술 도입**: 반드시 사용자 승인 필수 (선택 이유, 대안 분석, 장단점 설명)
2. **개발 서버 관리**: 절대 임의 실행/종료 금지
3. **커밋 관리**: 간결하고 논리적 단위로 분할
4. **코드 스타일**: named export 우선, 일관된 디자인 시스템
5. **답변 스타일**: 간결하고 직접적 (4줄 이내)

---

이 가이드라인을 준수하여 효율적이고 일관된 개발을 진행하세요.