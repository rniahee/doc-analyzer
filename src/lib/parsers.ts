import { PDFParse } from 'pdf-parse';
import mammoth from 'mammoth';
import { Workbook, type CellValue } from 'exceljs';
import { SUPPORTED_MIME_TYPES, type SupportedMimeType } from './options';

function isSupportedType(mimeType: string): mimeType is SupportedMimeType {
  return (SUPPORTED_MIME_TYPES as readonly string[]).includes(mimeType);
}

export async function parseFile(
  buffer: Buffer,
  mimeType: string,
): Promise<string> {
  if (!isSupportedType(mimeType)) {
    throw new Error(`지원하지 않는 파일 형식입니다: ${mimeType}`);
  }

  switch (mimeType as SupportedMimeType) {
    case 'application/pdf': {
      const parser = new PDFParse({ data: buffer });
      const result = await parser.getText();
      await parser.destroy();
      return result.text.trim();
    }
    case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document': {
      const result = await mammoth.extractRawText({ buffer });
      return result.value.trim();
    }
    case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': {
      const workbook = new Workbook();
      const arrayBuffer = buffer.buffer.slice(
        buffer.byteOffset,
        buffer.byteOffset + buffer.byteLength,
      ) as ArrayBuffer;
      await workbook.xlsx.load(arrayBuffer);
      const lines: string[] = [];
      workbook.eachSheet((sheet) => {
        sheet.eachRow((row) => {
          const values = (row.values as CellValue[]).slice(1);
          const line = values.map((v) => v?.toString() ?? '').join('\t');
          if (line.trim()) lines.push(line);
        });
      });
      return lines.join('\n').trim();
    }
    case 'text/plain': {
      return buffer.toString('utf-8').trim();
    }
  }
}
