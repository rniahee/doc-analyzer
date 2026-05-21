import { GoogleGenerativeAI } from '@google/generative-ai';
import {
  PURPOSE_OPTIONS,
  LENGTH_OPTIONS,
  SCOPE_OPTIONS,
  AUDIENCE_OPTIONS,
  LANGUAGE_OPTIONS,
} from './options';

type AnalysisOptions = {
  purpose: string;
  length: string;
  scope: string[];
  audience?: string;
  language?: string;
  additionalRequest?: string;
};

function findLabel(options: { label: string; value: string }[], value: string) {
  return options.find((o) => o.value === value)?.label ?? value;
}

export function buildPrompt(text: string, options: AnalysisOptions): string {
  const lines = [
    `[분석 목적] ${findLabel(PURPOSE_OPTIONS, options.purpose)}`,
    `[원하는 분량] ${findLabel(LENGTH_OPTIONS, options.length)}`,
    `[분석 범위] ${options.scope.map((v) => findLabel(SCOPE_OPTIONS, v)).join(', ')}`,
  ];

  if (options.audience) {
    lines.push(`[대상 독자] ${findLabel(AUDIENCE_OPTIONS, options.audience)}`);
  }
  if (options.language) {
    lines.push(`[출력 언어] ${findLabel(LANGUAGE_OPTIONS, options.language)}`);
  }
  if (options.additionalRequest) {
    lines.push(`[추가 요청사항] ${options.additionalRequest}`);
  }

  return `다음 조건에 맞게 아래 문서를 분석해 주세요.

${lines.join('\n')}

---
${text}
---`;
}

export async function analyzeWithGemini(prompt: string): Promise<string> {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
  const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
  const result = await model.generateContent(prompt);
  return result.response.text();
}
