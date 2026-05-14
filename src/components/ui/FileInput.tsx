'use client'

import { forwardRef, useState, type ChangeEvent, type InputHTMLAttributes } from 'react'

type FileInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  error?: string
}

export const FileInput = forwardRef<HTMLInputElement, FileInputProps>(
  function FileInput({ onChange, error, ...props }, ref) {
    const [filename, setFilename] = useState<string | null>(null)

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
      setFilename(e.target.files?.[0]?.name ?? null)
      onChange?.(e)
    }

    return (
      <div>
        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-neutral-300 rounded-lg cursor-pointer hover:border-neutral-400 hover:bg-neutral-50 transition-colors">
          <svg
            className="mb-2 w-6 h-6 text-neutral-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
          </svg>
          <span className="text-sm text-neutral-500">
            {filename ?? 'PDF, DOCX, TXT 파일을 선택하세요'}
          </span>
          <input
            type="file"
            className="hidden"
            ref={ref}
            onChange={handleChange}
            accept=".pdf,.docx,.txt"
            {...props}
          />
        </label>
        {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
      </div>
    )
  }
)
