import type { Metadata } from 'next'
import './globals.css'
import Header from './components/Header'
import Footer from './components/Footer'
import RecordLoader from './components/RecordLoader'

export const metadata: Metadata = {
  title: { default: 'cherrytan | Dev Blog', template: '%s | cherrytan' },
  description: 'HIPHOPについての雑談記事を書いていきます。',
  metadataBase: new URL('https://my-blog-brown-nu.vercel.app'),
  openGraph: {
    title: 'cherrytan | Dev Blog',
    description: 'HIPHOPについての雑談記事を書いていきます。',
    url: 'https://my-blog-brown-nu.vercel.app',
    siteName: 'cherrytan',
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary',
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
