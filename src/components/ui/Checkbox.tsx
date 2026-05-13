'use client'

type CheckboxProps = {
  label: string
  value: string
  checked: boolean
  onChange: (checked: boolean) => void
}

export function Checkbox({ label, value, checked, onChange }: CheckboxProps) {
  return (
    <label
      className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm cursor-pointer transition-colors ${
        checked
          ? 'border-neutral-900 bg-neutral-900 text-white'
          : 'border-neutral-200 text-neutral-700 enabled:hover:border-neutral-400'
      }`}
    >
      <input
        type="checkbox"
        className="sr-only"
        value={value}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      {label}
    </label>
  )
}
