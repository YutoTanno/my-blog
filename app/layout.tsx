import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'
import Header from './components/Header'
import Footer from './components/Footer'

const geist = Geist({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: { default: 'My Blog', template: '%s | My Blog' },
  description: 'Next.js・TypeScriptの学習記録。Web開発の学習過程をアウトプットしています。',
  metadataBase: new URL('https://my-blog-brown-nu.vercel.app'),
  openGraph: {
    title: 'My Blog',
    description: 'Next.js・TypeScriptの学習記録。Web開発の学習過程をアウトプットしています。',
    url: 'https://my-blog-brown-nu.vercel.app',
    siteName: 'My Blog',
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'My Blog',
    description: 'Next.js・TypeScriptの学習記録。Web開発の学習過程をアウトプットしています。',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className={`${geist.className} bg-white text-gray-900 min-h-screen flex flex-col`}>
        <Header />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  )
}
