'use client'

import { Checkbox } from './Checkbox'

type Option = { label: string; value: string }

type CheckboxGroupProps = {
  options: Option[]
  value: string[]
  onChange: (value: string[]) => void
  error?: string
  disabled?: boolean
}

export function CheckboxGroup({ options, value, onChange, error, disabled }: CheckboxGroupProps) {
  function toggle(optValue: string, checked: boolean) {
    onChange(
      checked
        ? [...value, optValue]
        : value.filter((v) => v !== optValue)
    )
  }

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <Checkbox
            key={opt.value}
            label={opt.label}
            value={opt.value}
            checked={value.includes(opt.value)}
            onChange={(checked) => toggle(opt.value, checked)}
            disabled={disabled}
          />
        ))}
      </div>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  )
}
