/**
 * @jest-environment node
 */

import { POST } from './route'
import { NextRequest } from 'next/server'

// extractContent 함수 모킹
jest.mock('@/lib/extractors', () => ({
  extractContent: jest.fn()
}))

const { extractContent } = require('@/lib/extractors')

describe('/api/extract', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should handle successful text extraction', async () => {
    const mockResult = {
      title: 'Test Title',
      content: 'Test content',
      sourceType: 'text'
    }

    extractContent.mockResolvedValue(mockResult)

    const request = new NextRequest('http://localhost:3000/api/extract', {
      method: 'POST',
      body: JSON.stringify({
        source: 'Test content',
        type: 'text'
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data).toEqual(mockResult)
    expect(extractContent).toHaveBeenCalledWith({
      source: 'Test content',
      type: 'text'
    })
  })

  it('should handle extraction errors', async () => {
    extractContent.mockRejectedValue(new Error('추출 실패'))

    const request = new NextRequest('http://localhost:3000/api/extract', {
      method: 'POST',
      body: JSON.stringify({
        source: 'invalid',
        type: 'invalid'
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(500)
    expect(data).toEqual({
      error: '추출 실패'
    })
  })

  it('should handle malformed request body', async () => {
    const request = new NextRequest('http://localhost:3000/api/extract', {
      method: 'POST',
      body: 'invalid json',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(500)
    expect(data).toHaveProperty('error')
  })
})