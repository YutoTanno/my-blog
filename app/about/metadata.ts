import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About | My Blog',
  description: 'YutoTannoのプロフィールページです。Next.js・TypeScriptを中心にWeb開発を学習しています。',
  openGraph: {
    title: 'About | My Blog',
    description: 'YutoTannoのプロフィールページです。',
    url: 'https://my-blog-brown-nu.vercel.app/about',
    siteName: 'YutoTanno Blog',
    type: 'profile',
  },
  twitter: {
    card: 'summary',
    title: 'About | My Blog',
    description: 'YutoTannoのプロフィールページです。',
  },
}