'use client'

type RadioProps = {
  label: string
  value: string
  name: string
  checked: boolean
  onChange: () => void
}

export function Radio({ label, value, name, checked, onChange }: RadioProps) {
  return (
    <label
      className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm cursor-pointer transition-colors ${
        checked
          ? 'border-neutral-900 bg-neutral-900 text-white'
          : 'border-neutral-200 text-neutral-700 hover:border-neutral-400'
      }`}
    >
      <input
        type="radio"
        className="sr-only"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
      />
      {label}
    </label>
  )
}
