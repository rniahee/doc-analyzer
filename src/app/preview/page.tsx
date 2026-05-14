'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { FileInput } from '@/components/ui/FileInput'
import { RadioGroup } from '@/components/ui/RadioGroup'
import { CheckboxGroup } from '@/components/ui/CheckboxGroup'
import { Textarea } from '@/components/ui/Textarea'

const PURPOSE_OPTIONS = [
  { label: '전체 내용 파악', value: 'overview' },
  { label: '핵심만 빠르게', value: 'quick' },
  { label: '발표 준비', value: 'presentation' },
  { label: '보고서 작성', value: 'report' },
  { label: '번역 준비', value: 'translation' },
]

const SCOPE_OPTIONS = [
  { label: '핵심 주제', value: 'topic' },
  { label: '주요 수치·데이터', value: 'data' },
  { label: '결론 및 시사점', value: 'conclusion' },
  { label: '용어 설명', value: 'terms' },
  { label: '목차 구조화', value: 'toc' },
]

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-xs font-semibold uppercase tracking-widest text-neutral-400">{title}</h2>
      {children}
    </section>
  )
}

export default function PreviewPage() {
  const [radioValue, setRadioValue] = useState('')
  const [checkboxValue, setCheckboxValue] = useState<string[]>([])

  return (
    <div className="min-h-screen bg-neutral-50 p-10">
      <h1 className="text-2xl font-bold text-neutral-900 mb-10">UI 컴포넌트 미리보기</h1>

      <div className="flex flex-col gap-12 max-w-xl">

        <Section title="Button">
          <div className="flex flex-wrap gap-3">
            <Button>Primary</Button>
            <Button variant="secondary">Ghost</Button>
            <Button disabled>Disabled</Button>
            <Button variant="secondary" disabled>Ghost Disabled</Button>
          </div>
        </Section>

        <Section title="FileInput">
          <FileInput />
          <FileInput error="파일을 선택해 주세요." />
        </Section>

        <Section title="RadioGroup">
          <RadioGroup
            name="purpose"
            options={PURPOSE_OPTIONS}
            value={radioValue}
            onChange={setRadioValue}
          />
          <p className="text-xs text-neutral-500">선택된 값: {radioValue || '없음'}</p>
          <RadioGroup
            name="purpose_error"
            options={PURPOSE_OPTIONS.slice(0, 3)}
            value=""
            onChange={() => {}}
            error="분석 목적을 선택해 주세요."
          />
        </Section>

        <Section title="CheckboxGroup">
          <CheckboxGroup
            options={SCOPE_OPTIONS}
            value={checkboxValue}
            onChange={setCheckboxValue}
          />
          <p className="text-xs text-neutral-500">
            선택된 값: {checkboxValue.length ? checkboxValue.join(', ') : '없음'}
          </p>
          <CheckboxGroup
            options={SCOPE_OPTIONS.slice(0, 3)}
            value={[]}
            onChange={() => {}}
            error="분석 범위를 하나 이상 선택해 주세요."
          />
        </Section>

        <Section title="Textarea">
          <Textarea placeholder="추가 요청사항을 입력하세요." />
          <Textarea defaultValue="내용이 있는 상태" />
          <Textarea error="내용을 입력해 주세요." placeholder="오류 상태" />
        </Section>

      </div>
    </div>
  )
}
