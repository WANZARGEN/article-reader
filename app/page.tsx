import Link from 'next/link'
import { BookOpen, Plus, Search, BarChart3 } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <BookOpen className="w-12 h-12 text-blue-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900">Article Reader</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            AI 기반 아티클 리더로 웹 콘텐츠를 읽고, 번역하고, 퀴즈를 풀어보세요
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center mb-4">
              <Plus className="w-8 h-8 text-green-600" />
              <h3 className="text-xl font-semibold ml-3">새 아티클 추가</h3>
            </div>
            <p className="text-gray-600 mb-4">
              URL, 파일 업로드 또는 텍스트로 새로운 아티클을 추가하세요
            </p>
            <Link href="/articles/new" className="block w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors text-center">
              아티클 추가
            </Link>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center mb-4">
              <Search className="w-8 h-8 text-blue-600" />
              <h3 className="text-xl font-semibold ml-3">아티클 탐색</h3>
            </div>
            <p className="text-gray-600 mb-4">
              저장된 아티클들을 카테고리별로 찾아보고 읽어보세요
            </p>
            <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
              아티클 보기
            </button>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center mb-4">
              <BarChart3 className="w-8 h-8 text-purple-600" />
              <h3 className="text-xl font-semibold ml-3">읽기 통계</h3>
            </div>
            <p className="text-gray-600 mb-4">
              읽기 진행률과 퀴즈 결과를 확인해보세요
            </p>
            <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors">
              통계 보기
            </button>
          </div>
        </div>

        {/* Features */}
        <div className="bg-white rounded-xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-center mb-8">주요 기능</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">스마트 읽기</h3>
              <p className="text-sm text-gray-600">마크다운으로 구조화된 깔끔한 읽기 환경</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="w-8 h-8 text-green-600 font-bold text-lg">한</div>
              </div>
              <h3 className="font-semibold mb-2">실시간 번역</h3>
              <p className="text-sm text-gray-600">단락별 원문/번역 토글 기능</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="w-8 h-8 text-purple-600 font-bold text-lg">Q</div>
              </div>
              <h3 className="font-semibold mb-2">AI 퀴즈</h3>
              <p className="text-sm text-gray-600">읽은 내용으로 자동 생성되는 퀴즈</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="font-semibold mb-2">자동 분류</h3>
              <p className="text-sm text-gray-600">AI가 자동으로 카테고리 분류</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}