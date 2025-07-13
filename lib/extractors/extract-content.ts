import { extractFromUrl } from './url-extractor'
import { extractFromFile } from './file-extractor'
import { ExtractionRequest, ExtractionResult, FileData } from './types'

export async function extractContent(request: ExtractionRequest): Promise<ExtractionResult> {
  const { source, type } = request
  
  let extractedContent
  let sourceUrl: string | undefined
  
  switch (type) {
    case 'url':
      if (typeof source !== 'string') {
        throw new Error('URL 타입의 source는 문자열이어야 합니다')
      }
      extractedContent = await extractFromUrl(source)
      sourceUrl = source
      break
      
    case 'file':
      if (typeof source === 'string') {
        throw new Error('파일 타입의 source는 FileData 객체여야 합니다')
      }
      extractedContent = await extractFromFile(source as FileData)
      break
      
    case 'text':
      if (typeof source !== 'string') {
        throw new Error('텍스트 타입의 source는 문자열이어야 합니다')
      }
      extractedContent = {
        title: '직접 입력한 텍스트',
        content: source
      }
      break
      
    default:
      throw new Error(`지원하지 않는 타입입니다: ${type}`)
  }
  
  return {
    ...extractedContent,
    sourceType: type,
    sourceUrl
  }
}