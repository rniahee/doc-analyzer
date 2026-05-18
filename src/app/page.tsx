'use client';

import { useState } from 'react';
import { AnalysisForm } from '@/components/AnalysisForm';

export default function Home() {
  const [result, setResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  function handleResult(value: string) {
    console.log('result:', value);
    setResult(value);
  }

  return (
    <main className="flex h-screen">
      <section className="w-1/2 border-r border-neutral-200 overflow-y-auto p-8">
        <h1 className="text-xl font-bold text-neutral-900 mb-6">문서 분석기</h1>
        <AnalysisForm onResult={handleResult} onLoadingChange={setIsLoading} />
      </section>

      <section className="w-1/2 overflow-y-auto p-8 bg-neutral-50 flex items-center justify-center">
        {isLoading && <p className="text-sm text-neutral-400">분석 중...</p>}
        {!isLoading && result && (
          <pre className="w-full text-sm text-neutral-800 whitespace-pre-wrap">
            {result}
          </pre>
        )}
        {!isLoading && !result && (
          <p className="text-sm text-neutral-400">
            분석 결과가 여기에 표시됩니다.
          </p>
        )}
      </section>
    </main>
  );
}
