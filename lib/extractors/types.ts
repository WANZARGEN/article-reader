export interface ExtractedContent {
  title: string
  content: string
}

export interface FileData {
  name: string
  content: string // base64
  type: string
}

export type SourceType = 'url' | 'file' | 'text'

export interface ExtractionRequest {
  source: string | FileData
  type: SourceType
}

export interface ExtractionResult extends ExtractedContent {
  sourceType: SourceType
  sourceUrl?: string
}