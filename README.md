# Article Reader

AI 기반 아티클 리더로 웹 콘텐츠를 읽고, 번역하고, 퀴즈를 풀어보세요.

## 🚀 기능

- 📖 **스마트 읽기**: URL, 파일, 텍스트를 마크다운으로 구조화
- 🌐 **실시간 번역**: 영문 아티클을 단락별로 한글 번역
- 🧠 **AI 퀴즈**: 읽은 내용을 바탕으로 자동 퀴즈 생성
- 📂 **자동 분류**: AI가 아티클을 카테고리별로 자동 분류
- 📊 **읽기 통계**: 읽기 진행률과 학습 현황 추적

## 🛠 기술 스택

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Prisma, SQLite
- **AI**: Claude API (Anthropic)
- **UI**: Radix UI, shadcn/ui, Lucide React

## 📦 설치 및 실행

### 1. 저장소 클론
\`\`\`bash
git clone <repository-url>
cd article-reader
\`\`\`

### 2. 의존성 설치
\`\`\`bash
pnpm install
\`\`\`

### 3. 환경변수 설정
\`\`\`bash
cp .env.example .env.local
\`\`\`

\`.env.local\` 파일을 열고 다음 값들을 설정하세요:

- **ANTHROPIC_API_KEY**: [Claude API Console](https://console.anthropic.com/)에서 발급받은 API 키
- **DATABASE_URL**: SQLite 데이터베이스 경로 (기본값 사용 가능)
- **NEXTAUTH_SECRET**: 랜덤 문자열 (인증용)

### 4. 데이터베이스 설정
\`\`\`bash
pnpm db:push
\`\`\`

### 5. 개발 서버 실행
\`\`\`bash
pnpm dev
\`\`\`

http://localhost:3000에서 애플리케이션을 확인할 수 있습니다.

## 📝 스크립트

- \`pnpm dev\`: 개발 서버 실행
- \`pnpm build\`: 프로덕션 빌드
- \`pnpm start\`: 프로덕션 서버 실행
- \`pnpm lint\`: ESLint 검사
- \`pnpm typecheck\`: TypeScript 타입 검사
- \`pnpm db:generate\`: Prisma 클라이언트 생성
- \`pnpm db:push\`: 데이터베이스 스키마 푸시
- \`pnpm db:studio\`: Prisma Studio 실행

## 🔒 환경변수

민감한 정보는 \`.env.local\` 파일에 저장하며, 이 파일은 Git에 포함되지 않습니다.

## 📄 라이선스

MIT License