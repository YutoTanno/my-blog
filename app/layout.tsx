import type { Metadata } from 'next'
import './globals.css'
import Header from './components/Header'
import Footer from './components/Footer'
import RecordLoader from './components/RecordLoader'

export const metadata: Metadata = {
  title: { default: 'YutoTanno | Dev Blog', template: '%s | YutoTanno' },
  description: 'Next.js・TypeScriptの学習記録。Web開発の学習過程をアウトプットしています。',
  metadataBase: new URL('https://my-blog-brown-nu.vercel.app'),
  openGraph: {
    title: 'YutoTanno | Dev Blog',
    description: 'Next.js・TypeScriptの学習記録。Web開発の学習過程をアウトプットしています。',
    url: 'https://my-blog-brown-nu.vercel.app',
    siteName: 'YutoTanno',
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'YutoTanno | Dev Blog',
    description: 'Next.js・TypeScriptの学習記録。Web開発の学習過程をアウトプットしています。',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <head>{/* ... 既存のhead ... */}</head>
      <body className="min-h-screen flex flex-col">
        <RecordLoader /> {/* ★追加 */}
        <Header />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  )
}
