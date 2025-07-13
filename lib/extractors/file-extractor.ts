import mammoth from 'mammoth'
import { ExtractedContent, FileData } from './types'

export async function extractFromFile(fileData: FileData): Promise<ExtractedContent> {
  const { name, content, type } = fileData
  const buffer = Buffer.from(content, 'base64')
  
  let extractedText = ''
  const title = extractTitleFromFileName(name)
  
  try {
    if (isPdfFile(type)) {
      throw new Error('PDF 파일은 아직 지원하지 않습니다')
    } else if (isWordFile(type)) {
      extractedText = await extractFromWord(buffer)
    } else if (isTextFile(type)) {
      extractedText = await extractFromText(buffer)
    } else {
      throw new Error(`지원하지 않는 파일 형식입니다: ${type}`)
    }
    
    return {
      title,
      content: extractedText.trim()
    }
    
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : '알 수 없는 오류'
    throw new Error(`파일 처리 중 오류: ${errorMessage}`)
  }
}

function extractTitleFromFileName(fileName: string): string {
  // 확장자 제거하고 제목으로 사용
  return fileName.replace(/\.[^/.]+$/, '') || '파일명 없음'
}

function isPdfFile(mimeType: string): boolean {
  return mimeType.includes('pdf')
}

function isWordFile(mimeType: string): boolean {
  return mimeType.includes('word') || 
         mimeType.includes('document') ||
         mimeType.includes('officedocument.wordprocessingml')
}

function isTextFile(mimeType: string): boolean {
  return mimeType.includes('text') || 
         mimeType.includes('plain')
}

async function extractFromWord(buffer: Buffer): Promise<string> {
  try {
    const result = await mammoth.extractRawText({ buffer })
    return result.value
  } catch (error) {
    throw new Error('Word 문서를 읽는 중 오류가 발생했습니다')
  }
}

async function extractFromText(buffer: Buffer): Promise<string> {
  try {
    return buffer.toString('utf-8')
  } catch (error) {
    throw new Error('텍스트 파일을 읽는 중 오류가 발생했습니다')
  }
}

// 추후 PDF 지원 시 사용할 함수
export async function extractFromPdf(_buffer: Buffer): Promise<string> {
  // TODO: pdf-parse 라이브러리 설치 후 구현
  throw new Error('PDF 파일 지원은 추후 구현 예정입니다')
}