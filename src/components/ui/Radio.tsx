'use client'

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
