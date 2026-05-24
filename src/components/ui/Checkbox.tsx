'use client'

type CheckboxProps = {
  label: string
  value: string
  checked: boolean
  onChange: (checked: boolean) => void
  disabled?: boolean
}

export function Checkbox({ label, value, checked, onChange, disabled }: CheckboxProps) {
  return (
    <label
      className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm transition-colors ${
        disabled
          ? 'cursor-not-allowed opacity-50'
          : 'cursor-pointer'
      } ${
        checked
          ? 'border-neutral-900 bg-neutral-900 text-white'
          : `border-neutral-200 text-neutral-700 ${!disabled ? 'hover:border-neutral-400' : ''}`
      }`}
    >
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
