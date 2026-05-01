import type { Metadata } from 'next'
import './globals.css'
import Header from './components/Header'
import Footer from './components/Footer'
import RecordLoader from './components/RecordLoader'

export const metadata: Metadata = {
  title: { default: 'cherrytan | Dev Blog', template: '%s | cherrytan' },
  description: 'HIPHOPが好きなWeb開発者cherrytanのブログ。Next.js・TypeScriptで自作しました。',
  metadataBase: new URL('https://cherrytan-hiphop.vercel.app'),
  openGraph: {
    title: 'cherrytan | Dev Blog',
    description: 'HIPHOPが好きなエンジニアcherrytanのブログ。',
    url: 'https://cherrytan-hiphop.vercel.app',
    siteName: 'cherrytan',
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'cherrytan | HIPHOP Blog',
    description: 'HIPHOPについての雑談記事を書いていきます。',
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
