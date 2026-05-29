'use client'

import { getToggleItemClassName } from './utils'

type RadioProps = {
  label: string
  value: string
  name: string
  checked: boolean
  onChange: () => void
  disabled?: boolean
}

export function Radio({ label, value, name, checked, onChange, disabled }: RadioProps) {
  return (
    <label className={getToggleItemClassName(checked, disabled)}>
      <input
        type="radio"
        className="sr-only"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
      />
      {label}
    </label>
  )
}
