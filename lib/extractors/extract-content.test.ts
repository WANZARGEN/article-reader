import { extractContent } from './extract-content'

// URL과 파일 추출 모킹
jest.mock('./url-extractor', () => ({
  extractFromUrl: jest.fn()
}))

jest.mock('./file-extractor', () => ({
  extractFromFile: jest.fn()
}))

describe('extractContent', () => {
  describe('text type', () => {
    it('should extract text content correctly', async () => {
      const request = {
        source: 'This is a test content.',
        type: 'text' as const
      }

      const result = await extractContent(request)

      expect(result).toEqual({
        title: '직접 입력한 텍스트',
        content: 'This is a test content.',
        sourceType: 'text',
        sourceUrl: undefined
      })
    })

    it('should throw error for invalid text source', async () => {
      const request = {
        source: 123 as any,
        type: 'text' as const
      }

      await expect(extractContent(request)).rejects.toThrow(
        '텍스트 타입의 source는 문자열이어야 합니다'
      )
    })
  })

  describe('file type', () => {
    it('should throw error for string source with file type', async () => {
      const request = {
        source: 'invalid-string',
        type: 'file' as const
      }

      await expect(extractContent(request)).rejects.toThrow(
        '파일 타입의 source는 FileData 객체여야 합니다'
      )
    })
  })

  describe('url type', () => {
    it('should throw error for non-string source with url type', async () => {
      const request = {
        source: { invalid: 'object' } as any,
        type: 'url' as const
      }

      await expect(extractContent(request)).rejects.toThrow(
        'URL 타입의 source는 문자열이어야 합니다'
      )
    })
  })

  describe('invalid type', () => {
    it('should throw error for unsupported type', async () => {
      const request = {
        source: 'test',
        type: 'invalid' as any
      }

      await expect(extractContent(request)).rejects.toThrow(
        '지원하지 않는 타입입니다: invalid'
      )
    })
  })
})