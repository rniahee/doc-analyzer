# Doc Analyzer

PDF, DOCX, TXT 파일을 업로드하면 Gemini AI가 맞춤 요약·분석 결과를 제공하는 웹앱입니다.

## 프로젝트 배경

실무에서 AI 연동 문서 작성 보조 도구를 개발하면서, AI가 유용한 결과를 내려면 사용자의 의도와 맥락을 정확히 전달하는 것이 핵심이라는 걸 경험했습니다.

그러면서 평소에 느끼던 불편함이 떠올랐습니다. 긴 문서를 읽을 때 목적에 따라 필요한 정보가 다른데, 기존 AI 요약 도구들은 결과를 사용자가 제어하기 어렵다는 점이었습니다.

이 두 경험을 바탕으로, 분석 목적·원하는 분량·범위·대상 독자 등을 직접 지정하면 그에 맞는 결과를 돌려주는 문서 분석 도구를 직접 설계하고 구현했습니다.

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
