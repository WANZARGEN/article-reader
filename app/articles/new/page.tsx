'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArticleForm } from '@/components/ArticleForm'

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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <ArticleForm onSubmit={handleSubmit} isLoading={isLoading} />
      </div>
    </div>
  )
}