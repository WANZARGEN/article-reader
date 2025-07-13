import { NextRequest, NextResponse } from 'next/server'
import { extractContent } from '@/lib/extractors'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { source, type } = body
    
    const result = await extractContent({ source, type })
    
    return NextResponse.json(result)
    
  } catch (error) {
    console.error('추출 오류:', error)
    
    const errorMessage = error instanceof Error ? error.message : '알 수 없는 오류'
    
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    )
  }
}