export function getToggleItemClassName(
  checked: boolean,
  disabled?: boolean,
): string {
  return [
    'flex items-center gap-2 px-3 py-2 rounded-lg border text-sm transition-colors',
    disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
    checked
      ? 'border-neutral-900 bg-neutral-900 text-white'
      : `border-neutral-200 text-neutral-700 ${!disabled ? 'hover:border-neutral-400' : ''}`,
  ].join(' ');
}
