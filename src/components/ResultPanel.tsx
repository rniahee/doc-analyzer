'use client'

import { Button } from '@/components/ui/Button'

type ResultPanelProps = {
  result: string | null
  isLoading: boolean
}

export function ResultPanel({ result, isLoading }: ResultPanelProps) {
  function handleCopy() {
    if (result) navigator.clipboard.writeText(result)
  }

  function handleDownload() {
    if (!result) return
    const blob = new Blob([result], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'analysis.md'
    a.click()
    URL.revokeObjectURL(url)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-sm text-neutral-400">분석 중...</p>
      </div>
    )
  }

  if (!result) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-sm text-neutral-400">분석 결과가 여기에 표시됩니다.</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full gap-4">
      <div className="flex justify-end gap-2">
        <Button variant="secondary" onClick={handleCopy}>복사</Button>
        <Button variant="secondary" onClick={handleDownload}>다운로드</Button>
      </div>
      <pre className="flex-1 overflow-y-auto text-sm text-neutral-800 whitespace-pre-wrap leading-relaxed">
        {result}
      </pre>
    </div>
  )
}
