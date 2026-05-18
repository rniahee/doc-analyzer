export type Option = { label: string; value: string };

export const PURPOSE_OPTIONS: Option[] = [
  { label: '전체 내용 파악', value: 'overview' },
  { label: '핵심만 빠르게', value: 'quick' },
  { label: '발표 준비', value: 'presentation' },
  { label: '보고서 작성', value: 'report' },
  { label: '번역 준비', value: 'translation' },
];

export const LENGTH_OPTIONS: Option[] = [
  { label: '한 줄 요약', value: 'one-line' },
  { label: '짧게 (3~5줄)', value: 'short' },
  { label: '보통 (단락)', value: 'medium' },
  { label: '길게 (섹션별 상세)', value: 'long' },
];

export const SCOPE_OPTIONS: Option[] = [
  { label: '핵심 주제', value: 'topic' },
  { label: '주요 수치·데이터', value: 'data' },
  { label: '결론 및 시사점', value: 'conclusion' },
  { label: '용어 설명', value: 'terms' },
  { label: '목차 구조화', value: 'toc' },
];

export const AUDIENCE_OPTIONS: Option[] = [
  { label: '본인용', value: 'self' },
  { label: '팀 공유', value: 'team' },
  { label: '외부 발표', value: 'external' },
  { label: '비전문가 설명용', value: 'non-expert' },
];

export const LANGUAGE_OPTIONS: Option[] = [
  { label: '한국어', value: 'ko' },
  { label: '영어', value: 'en' },
  { label: '원문 유지', value: 'original' },
];
