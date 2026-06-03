'use client';

import { useForm, Controller } from 'react-hook-form';
import { Button } from '@/components/ui/Button';
import { FileInput } from '@/components/ui/FileInput';
import { RadioGroup } from '@/components/ui/RadioGroup';
import { CheckboxGroup } from '@/components/ui/CheckboxGroup';
import { Textarea } from '@/components/ui/Textarea';
import {
  PURPOSE_OPTIONS,
  LENGTH_OPTIONS,
  SCOPE_OPTIONS,
  AUDIENCE_OPTIONS,
  LANGUAGE_OPTIONS,
  SUPPORTED_MIME_TYPES,
} from '@/lib/options';

type FormValues = {
  file: FileList;
  purpose: string;
  length: string;
  scope: string[];
  audience: string;
  language: string;
  additionalRequest: string;
};

type AnalysisFormProps = {
  onResult: (result: string) => void;
  onError: (error: string) => void;
  onLoadingChange: (loading: boolean) => void;
};

function FieldLabel({
  label,
  required,
}: {
  label: string;
  required?: boolean;
}) {
  return (
    <p className="text-sm font-medium text-neutral-800">
      {label}
      {required && <span className="ml-1 text-red-500">*</span>}
    </p>
  );
}

export function AnalysisForm({
  onResult,
  onError,
  onLoadingChange,
}: AnalysisFormProps) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      scope: [],
      audience: '',
      language: '',
      additionalRequest: '',
    },
  });

  async function onSubmit(data: FormValues) {
    onLoadingChange(true);
    try {
      const formData = new FormData();
      formData.append('file', data.file[0]);
      formData.append('purpose', data.purpose);
      formData.append('length', data.length);
      formData.append('scope', JSON.stringify(data.scope));
      if (data.audience) formData.append('audience', data.audience);
      if (data.language) formData.append('language', data.language);
      if (data.additionalRequest)
        formData.append('additionalRequest', data.additionalRequest);

      const res = await fetch('/api/analyze', {
        method: 'POST',
        body: formData,
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? '분석에 실패했습니다.');
      onResult(json.result);
    } catch (e) {
      onError(
        e instanceof Error ? e.message : '알 수 없는 오류가 발생했습니다.',
      );
    } finally {
      onLoadingChange(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <FieldLabel label="파일 업로드" required />
        <FileInput
          {...register('file', {
            required: '파일을 선택해 주세요.',
            validate: {
              type: (files) =>
                (SUPPORTED_MIME_TYPES as readonly string[]).includes(
                  files[0]?.type,
                ) || 'PDF, DOCX, TXT 파일만 업로드할 수 있습니다.',
              size: (files) => {
                if (files[0]?.size === 0) return '파일 내용이 비어 있습니다.';
                if (files[0]?.size > 10 * 1024 * 1024)
                  return '10MB 이하의 파일만 업로드할 수 있습니다.';
                return true;
              },
            },
          })}
          error={errors.file?.message}
          disabled={isSubmitting}
        />
      </div>

      <div className="flex flex-col gap-2">
        <FieldLabel label="분석 목적" required />
        <Controller
          name="purpose"
          control={control}
          rules={{ required: '분석 목적을 선택해 주세요.' }}
          render={({ field }) => (
            <RadioGroup
              name="purpose"
              options={PURPOSE_OPTIONS}
              value={field.value ?? ''}
              onChange={field.onChange}
              error={errors.purpose?.message}
              disabled={isSubmitting}
            />
          )}
        />
      </div>

      <div className="flex flex-col gap-2">
        <FieldLabel label="원하는 분량" required />
        <Controller
          name="length"
          control={control}
          rules={{ required: '원하는 분량을 선택해 주세요.' }}
          render={({ field }) => (
            <RadioGroup
              name="length"
              options={LENGTH_OPTIONS}
              value={field.value ?? ''}
              onChange={field.onChange}
              error={errors.length?.message}
              disabled={isSubmitting}
            />
          )}
        />
      </div>

      <div className="flex flex-col gap-2">
        <FieldLabel label="분석 범위" required />
        <Controller
          name="scope"
          control={control}
          rules={{
            validate: (v) =>
              v.length > 0 || '분석 범위를 하나 이상 선택해 주세요.',
          }}
          render={({ field }) => (
            <CheckboxGroup
              options={SCOPE_OPTIONS}
              value={field.value}
              onChange={field.onChange}
              error={errors.scope?.message}
              disabled={isSubmitting}
            />
          )}
        />
      </div>

      <hr className="border-neutral-100" />

      <div className="flex flex-col gap-2">
        <FieldLabel label="대상 독자" />
        <Controller
          name="audience"
          control={control}
          render={({ field }) => (
            <RadioGroup
              name="audience"
              options={AUDIENCE_OPTIONS}
              value={field.value ?? ''}
              onChange={field.onChange}
              disabled={isSubmitting}
            />
          )}
        />
      </div>

      <div className="flex flex-col gap-2">
        <FieldLabel label="출력 언어" />
        <Controller
          name="language"
          control={control}
          render={({ field }) => (
            <RadioGroup
              name="language"
              options={LANGUAGE_OPTIONS}
              value={field.value ?? ''}
              onChange={field.onChange}
              disabled={isSubmitting}
            />
          )}
        />
      </div>

      <div className="flex flex-col gap-2">
        <FieldLabel label="추가 요청사항" />
        <Textarea
          {...register('additionalRequest')}
          placeholder="자유롭게 입력하세요."
          disabled={isSubmitting}
        />
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? '분석 중...' : '분석 시작'}
      </Button>
    </form>
  );
}
