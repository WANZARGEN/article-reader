'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Loader2, Link, Upload, Type } from 'lucide-react'
import { colors, buttonStyles, cardStyles, inputStyles, tabStyles } from '@/components/ui/common'
import { cn } from '@/lib/utils'

const urlSchema = z.object({
  url: z.string().url('올바른 URL을 입력하세요')
})

const textSchema = z.object({
  content: z.string().min(10, '최소 10자 이상 입력하세요')
})

type UrlFormData = z.infer<typeof urlSchema>
type TextFormData = z.infer<typeof textSchema>

interface ArticleFormProps {
  onSubmit: (data: { title: string; content: string; sourceType: string; sourceUrl?: string }) => void
  isLoading?: boolean
}

export function ArticleForm({ onSubmit, isLoading = false }: ArticleFormProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [extracting, setExtracting] = useState(false)

  const urlForm = useForm<UrlFormData>({
    resolver: zodResolver(urlSchema)
  })

  const textForm = useForm<TextFormData>({
    resolver: zodResolver(textSchema)
  })

  const handleUrlSubmit = async (data: UrlFormData) => {
    setExtracting(true)
    try {
      const response = await fetch('/api/extract', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source: data.url,
          type: 'url'
        })
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'URL 처리 중 오류가 발생했습니다')
      }

      const result = await response.json()
      onSubmit(result)
    } catch (error) {
      console.error('URL 추출 오류:', error)
      alert(error instanceof Error ? error.message : 'URL 처리 중 오류가 발생했습니다')
    } finally {
      setExtracting(false)
    }
  }

  const handleFileSubmit = async () => {
    if (!selectedFile) {
      alert('파일을 선택해주세요')
      return
    }

    setExtracting(true)
    try {
      // 파일을 base64로 변환
      const fileContent = await fileToBase64(selectedFile)
      
      const response = await fetch('/api/extract', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source: {
            name: selectedFile.name,
            content: fileContent,
            type: selectedFile.type
          },
          type: 'file'
        })
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || '파일 처리 중 오류가 발생했습니다')
      }

      const result = await response.json()
      onSubmit(result)
    } catch (error) {
      console.error('파일 추출 오류:', error)
      alert(error instanceof Error ? error.message : '파일 처리 중 오류가 발생했습니다')
    } finally {
      setExtracting(false)
    }
  }

  const handleTextSubmit = (data: TextFormData) => {
    onSubmit({
      title: '직접 입력한 텍스트',
      content: data.content,
      sourceType: 'text'
    })
  }

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        const result = reader.result as string
        // "data:mime;base64," 부분 제거
        const base64 = result.split(',')[1]
        resolve(base64)
      }
      reader.onerror = reject
    })
  }

  const isProcessing = extracting || isLoading

  return (
    <div className={cn(cardStyles.base, "w-full max-w-3xl mx-auto overflow-hidden")}>
      <div className={cardStyles.header}>
        <h2 className="flex items-center gap-3 text-xl font-semibold">
          <Type className="w-6 h-6" />
          콘텐츠 입력
        </h2>
      </div>
      <div className={cardStyles.content}>
        <Tabs defaultValue="url" className="w-full">
          <TabsList className={cn(tabStyles.list, "w-full h-auto")}>
            <TabsTrigger value="url" className={cn(tabStyles.trigger, "data-[state=active]:bg-blue-600 data-[state=active]:text-white h-auto")}>
              <Link className="w-4 h-4" />
              URL
            </TabsTrigger>
            <TabsTrigger value="file" className={cn(tabStyles.trigger, "data-[state=active]:bg-green-600 data-[state=active]:text-white h-auto")}>
              <Upload className="w-4 h-4" />
              파일
            </TabsTrigger>
            <TabsTrigger value="text" className={cn(tabStyles.trigger, "data-[state=active]:bg-purple-600 data-[state=active]:text-white h-auto")}>
              <Type className="w-4 h-4" />
              텍스트
            </TabsTrigger>
          </TabsList>

          <TabsContent value="url" className={tabStyles.content}>
            <form onSubmit={urlForm.handleSubmit(handleUrlSubmit)} className="space-y-6">
              <div className="space-y-3">
                <Label htmlFor="url" className="text-sm font-semibold text-gray-700">웹사이트 URL</Label>
                <Input
                  id="url"
                  placeholder="https://example.com/article"
                  {...urlForm.register('url')}
                  disabled={isProcessing}
                  className={cn(inputStyles.base, urlForm.formState.errors.url && inputStyles.error)}
                />
                {urlForm.formState.errors.url && (
                  <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
                    <span className="text-red-500">⚠</span>
                    {urlForm.formState.errors.url.message}
                  </p>
                )}
              </div>
              <Button 
                type="submit" 
                disabled={isProcessing} 
                className={cn(buttonStyles.base, buttonStyles.sizes.md, colors.primary, "w-full shadow-lg hover:shadow-xl")}
              >
                {extracting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    추출 중...
                  </>
                ) : (
                  'URL에서 추출'
                )}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="file" className={tabStyles.content}>
            <div className="space-y-3">
              <Label htmlFor="file" className="text-sm font-semibold text-gray-700">파일 선택</Label>
              <Input
                id="file"
                type="file"
                accept=".txt,.doc,.docx"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSelectedFile(e.target.files?.[0] || null)}
                disabled={isProcessing}
                className={cn(inputStyles.base, "file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100 cursor-pointer")}
              />
              {selectedFile && (
                <p className="text-sm text-green-600 mt-2 flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  선택된 파일: <span className="font-medium">{selectedFile.name}</span>
                </p>
              )}
              <p className="text-xs text-gray-500 mt-1">
                지원 형식: .txt, .doc, .docx (PDF는 추후 지원 예정)
              </p>
            </div>
            <Button 
              onClick={handleFileSubmit} 
              disabled={!selectedFile || isProcessing}
              className={cn(buttonStyles.base, buttonStyles.sizes.md, colors.secondary, "w-full shadow-lg hover:shadow-xl")}
            >
              {extracting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  추출 중...
                </>
              ) : (
                '파일에서 추출'
              )}
            </Button>
          </TabsContent>

          <TabsContent value="text" className={tabStyles.content}>
            <form onSubmit={textForm.handleSubmit(handleTextSubmit)} className="space-y-6">
              <div className="space-y-3">
                <Label htmlFor="content" className="text-sm font-semibold text-gray-700">텍스트 내용</Label>
                <Textarea
                  id="content"
                  placeholder="여기에 텍스트를 직접 입력하세요..."
                  rows={8}
                  {...textForm.register('content')}
                  disabled={isProcessing}
                  className={cn(inputStyles.base, "resize-none", textForm.formState.errors.content && inputStyles.error)}
                />
                {textForm.formState.errors.content && (
                  <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
                    <span className="text-red-500">⚠</span>
                    {textForm.formState.errors.content.message}
                  </p>
                )}
              </div>
              <Button 
                type="submit" 
                disabled={isProcessing} 
                className={cn(buttonStyles.base, buttonStyles.sizes.md, colors.accent, "w-full shadow-lg hover:shadow-xl")}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    저장 중...
                  </>
                ) : (
                  '텍스트 추가'
                )}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}