'use client'

import { getToggleItemClassName } from './utils'

type CheckboxProps = {
  label: string
  value: string
  checked: boolean
  onChange: (checked: boolean) => void
  disabled?: boolean
}

export function Checkbox({ label, value, checked, onChange, disabled }: CheckboxProps) {
  return (
    <label className={getToggleItemClassName(checked, disabled)}>
      <input
        type="checkbox"
        className="sr-only"
        value={value}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
      />
      {label}
    </label>
  )
}
