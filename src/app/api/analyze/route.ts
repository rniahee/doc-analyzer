import { parseFile } from '@/lib/parsers'
import { buildPrompt, analyzeWithGemini } from '@/lib/gemini'

export async function POST(request: Request) {
  const formData = await request.formData()

  const file = formData.get('file')
  const purpose = formData.get('purpose')
  const length = formData.get('length')
  const scopeRaw = formData.get('scope')

  if (!(file instanceof File) || !purpose || !length || !scopeRaw) {
    return Response.json({ error: '필수 항목이 누락됐습니다.' }, { status: 400 })
  }

  const scope: string[] = JSON.parse(scopeRaw as string)
  const audience = formData.get('audience') as string | null
  const language = formData.get('language') as string | null
  const additionalRequest = formData.get('additionalRequest') as string | null

  try {
    const buffer = Buffer.from(await file.arrayBuffer())
    const text = await parseFile(buffer, file.type)

    const prompt = buildPrompt(text, {
      purpose: purpose as string,
      length: length as string,
      scope,
      ...(audience && { audience }),
      ...(language && { language }),
      ...(additionalRequest && { additionalRequest }),
    })

    const result = await analyzeWithGemini(prompt)
    return Response.json({ result })
  } catch (e) {
    console.error('[/api/analyze]', e)
    const message = e instanceof Error && e.message.includes('지원하지 않는 파일')
      ? e.message
      : '분석 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.'
    return Response.json({ error: message }, { status: 500 })
  }
}
