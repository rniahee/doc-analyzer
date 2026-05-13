'use client'

import { Radio } from './Radio'

type Option = { label: string; value: string }

type RadioGroupProps = {
  name: string
  options: Option[]
  value: string
  onChange: (value: string) => void
  error?: string
}

export function RadioGroup({ name, options, value, onChange, error }: RadioGroupProps) {
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
          />
        ))}
      </div>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  )
}
