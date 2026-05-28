'use client'

import { Radio } from './Radio'
import type { Option } from '@/lib/options'

type RadioGroupProps = {
  name: string
  options: Option[]
  value: string
  onChange: (value: string) => void
  error?: string
  disabled?: boolean
}

export function RadioGroup({ name, options, value, onChange, error, disabled }: RadioGroupProps) {
  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <Radio
            key={opt.value}
            name={name}
            label={opt.label}
            value={opt.value}
            checked={value === opt.value}
            onChange={() => onChange(opt.value)}
            disabled={disabled}
          />
        ))}
      </div>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  )
}
