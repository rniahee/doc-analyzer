# Doc Analyzer

PDF, DOCX, TXT 파일을 업로드하면 Gemini AI가 맞춤 요약·분석 결과를 제공하는 웹앱입니다.

## 기술 스택

| 분류       | 사용 기술                       |
| ---------- | ------------------------------- |
| 프레임워크 | Next.js 16 (App Router)         |
| 스타일     | Tailwind CSS v4                 |
| 폼         | react-hook-form                 |
| AI         | Gemini API (`gemini-2.0-flash`) |
| 파일 파싱  | pdf-parse, mammoth              |

## 주요 기능

- **파일 업로드** — PDF, DOCX, TXT 지원
- **분석 옵션** — 목적, 분량, 범위, 대상 독자, 출력 언어를 선택해 맞춤 분석
- **결과 내보내기** — 분석 결과 복사 및 마크다운 파일 다운로드

## 프로젝트 구조

```
src/
├── app/
│   ├── api/analyze/      # 파일 파싱 + Gemini API 호출
│   ├── layout.tsx
│   └── page.tsx          # 레이아웃 (폼 + 결과)
├── components/
│   ├── ui/               # 재사용 가능한 기본 UI 컴포넌트
│   ├── AnalysisForm.tsx  # 분석 옵션 입력 폼
│   └── ResultPanel.tsx   # 분석 결과 표시
└── lib/
    ├── gemini.ts         # 프롬프트 빌더 + Gemini API 연동
    ├── options.ts        # 폼 옵션 상수
    └── parsers.ts        # PDF/DOCX/TXT 파일 파싱
```

## 시작하기

### 1. 패키지 설치

```bash
# npm
npm install

# yarn
yarn install
```

### 2. 환경변수 설정

`.env.local` 파일을 생성하고 Gemini API 키를 입력합니다.

```bash
GEMINI_API_KEY=your_api_key_here
```

API 키는 [Google AI Studio](https://aistudio.google.com)에서 발급받을 수 있습니다.

### 3. 개발 서버 실행

```bash
# npm
npm run dev

# yarn
yarn dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인합니다.
