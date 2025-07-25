import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Article Reader',
  description: 'AI-powered article reader with translation and quiz features',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body className="antialiased">{children}</body>
    </html>
  )
}