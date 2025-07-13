import { cn } from "@/lib/utils"

// 공통 색상과 스타일 토큰
export const colors = {
  primary: "bg-blue-600 hover:bg-blue-700 text-white",
  secondary: "bg-green-600 hover:bg-green-700 text-white", 
  accent: "bg-purple-600 hover:bg-purple-700 text-white",
  muted: "bg-gray-100 hover:bg-gray-200 text-gray-700",
  gradient: {
    primary: "bg-gradient-to-br from-blue-50 to-indigo-100",
    card: "bg-white shadow-lg hover:shadow-xl"
  }
}

// 공통 버튼 스타일
export const buttonStyles = {
  base: "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed",
  sizes: {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-3 text-base", 
    lg: "px-6 py-4 text-lg"
  }
}

// 공통 카드 스타일
export const cardStyles = {
  base: "bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200",
  header: "bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-xl p-6",
  content: "p-6"
}

// 공통 입력 필드 스타일
export const inputStyles = {
  base: "w-full px-4 py-3 border-2 border-gray-200 rounded-lg transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none",
  error: "border-red-300 focus:border-red-500 focus:ring-red-200"
}

// 공통 탭 스타일
export const tabStyles = {
  list: "grid grid-cols-3 bg-gray-100 p-1 rounded-xl mb-6",
  trigger: "flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-medium transition-all duration-200 cursor-pointer data-[state=active]:shadow-sm",
  content: "mt-6 space-y-6"
}