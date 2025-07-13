'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArticleForm } from '@/components/ArticleForm'
import { colors } from '@/components/ui/common'

export default function NewArticlePage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (data: { title: string; content: string; sourceType: string; sourceUrl?: string }) => {
    setIsLoading(true)
    try {
      // TODO: 추후 데이터베이스 저장 로직 구현
      console.log('추출된 아티클:', data)
      
      // 임시로 메인 페이지로 리다이렉트
      router.push('/')
    } catch (error) {
      console.error('아티클 저장 오류:', error)
      alert('아티클 저장 중 오류가 발생했습니다')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">새 아티클 추가</h1>
          <p className="text-lg text-gray-600">URL, 파일, 또는 텍스트로 새로운 아티클을 추가하세요</p>
        </div>
        <ArticleForm onSubmit={handleSubmit} isLoading={isLoading} />
      </div>
    </div>
  )
}