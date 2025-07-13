import puppeteer from 'puppeteer'
import * as cheerio from 'cheerio'
import { ExtractedContent } from './types'

export async function extractFromUrl(url: string): Promise<ExtractedContent> {
  const browser = await puppeteer.launch({ 
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  })
  
  try {
    const page = await browser.newPage()
    
    // User-Agent 설정으로 차단 방지
    await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36')
    
    await page.goto(url, { 
      waitUntil: 'networkidle0',
      timeout: 30000 
    })
    
    const content = await page.content()
    const $ = cheerio.load(content)
    
    // 불필요한 요소 제거
    removeUnnecessaryElements($)
    
    // 제목 추출
    const title = extractTitle($)
    
    // 본문 추출
    const mainContent = extractMainContent($)
    
    return {
      title: title.trim(),
      content: cleanText(mainContent)
    }
    
  } finally {
    await browser.close()
  }
}

function removeUnnecessaryElements($: cheerio.CheerioAPI) {
  // 스크립트, 스타일, 네비게이션 등 제거
  $('script, style, nav, header, footer, aside').remove()
  $('.ad, .advertisement, .sidebar, .comments, .social-share').remove()
  $('[class*="ad-"], [id*="ad-"], [class*="banner"]').remove()
}

function extractTitle($: cheerio.CheerioAPI): string {
  // 우선순위별 제목 추출
  const titleSources = [
    () => $('meta[property="og:title"]').attr('content'),
    () => $('meta[name="twitter:title"]').attr('content'),
    () => $('h1').first().text(),
    () => $('title').text(),
    () => $('.title, .post-title, .article-title').first().text()
  ]
  
  for (const getTitle of titleSources) {
    const title = getTitle()?.trim()
    if (title && title.length > 0) {
      return title
    }
  }
  
  return '제목 없음'
}

function extractMainContent($: cheerio.CheerioAPI): string {
  // 우선순위별 콘텐츠 영역 탐색
  const contentSelectors = [
    'article',
    '[role="main"]',
    'main',
    '.content',
    '.post-content',
    '.entry-content', 
    '.article-content',
    '.main-content',
    '.post-body',
    '.article-body'
  ]
  
  for (const selector of contentSelectors) {
    const element = $(selector)
    if (element.length) {
      const text = element.text().trim()
      if (text.length > 100) { // 충분한 내용이 있는지 확인
        return text
      }
    }
  }
  
  // 메인 콘텐츠를 찾지 못한 경우 body에서 추출
  return $('body').text()
}

function cleanText(text: string): string {
  return text
    .replace(/\s+/g, ' ')           // 연속된 공백을 하나로
    .replace(/\n\s*\n/g, '\n\n')    // 연속된 줄바꿈을 두 개로
    .replace(/^\s+|\s+$/g, '')      // 앞뒤 공백 제거
    .trim()
}