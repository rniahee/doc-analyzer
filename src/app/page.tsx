'use client';

import { useState } from 'react';
import { AnalysisForm } from '@/components/AnalysisForm';
import { ResultPanel } from '@/components/ResultPanel';

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

      <section className="w-1/2 overflow-y-auto p-8 bg-neutral-50">
        <ResultPanel result={result} isLoading={isLoading} />
      </section>
    </main>
  );
}
