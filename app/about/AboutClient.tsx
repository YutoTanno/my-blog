'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import ImageUploader from '@/app/components/ImageUploader'
import { createBrowserClient } from '@supabase/ssr'

const supabase = createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

export default function AboutClient() {
  const [profileImage, setProfileImage] = useState<string | null>(null)

  useEffect(() => {
    const loadAvatar = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      const url = user?.user_metadata?.avatar_url
      if (url) setProfileImage(url)
    }
    loadAvatar()
  }, [])

  const handleProfileUpload = async (url: string) => {
    setProfileImage(url)
    await supabase.auth.updateUser({
      data: { avatar_url: url },
    })
  }

  const skills = [
    { category: 'フロントエンド', items: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'] },
    { category: 'バックエンド', items: ['Supabase', 'PostgreSQL', 'REST API'] },
    { category: 'ツール', items: ['Git', 'GitHub', 'Vercel', 'VSCode'] },
  ]

  const timeline = [
    { year: '2024', title: 'Web開発の学習を開始', description: 'HTML・CSS・JavaScriptの基礎から学習開始。' },
    { year: '2024', title: 'React・Next.jsを習得', description: 'コンポーネント設計・App Routerを学ぶ。' },
    { year: '2025', title: 'このブログを自作・公開', description: 'Supabase・Vercelを使ったフルスタック開発を実践。' },
    { year: '2025', title: '副業・フリーランスを目指して活動中', description: 'ポートフォリオ拡充・案件獲得に向けて準備中。' },
  ]

  return (
    <main className="max-w-3xl mx-auto px-4 py-16">
      <div className="mb-16">
        <h1 className="text-4xl font-bold mb-4">About</h1>
        <p className="text-gray-400 text-sm">プロフィール</p>
      </div>

      {/* プロフィール */}
      <section className="mb-16">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8">
          {/* アイコン + アップロードボタン */}
          <div className="relative shrink-0">
            <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center text-4xl overflow-hidden">{profileImage ? <img src={profileImage} alt="プロフィール" className="w-full h-full object-cover" /> : '👨‍💻'}</div>
            <div className="absolute -bottom-1 -right-1">
              <ImageUploader folder="profile" label="✏️" onUpload={handleProfileUpload} />
            </div>
          </div>
          <div className="text-center sm:text-left">
            <h2 className="text-2xl font-bold mb-2">YutoTanno</h2>
            <p className="text-gray-500 text-sm mb-4">Web Developer</p>
            <p className="text-gray-600 leading-relaxed">Next.js・TypeScriptを中心にWeb開発を学習しています。このブログは学習記録としてアウトプットする場として作成しました。副業・フリーランスとしての活動も目指しています。</p>
          </div>
        </div>
      </section>

      {/* スキル */}
      <section className="mb-16">
        <h2 className="text-xl font-bold mb-6">スキル</h2>
        <div className="space-y-6">
          {skills.map((skill) => (
            <div key={skill.category}>
              <h3 className="text-sm font-medium text-gray-400 mb-3">{skill.category}</h3>
              <div className="flex gap-2 flex-wrap">
                {skill.items.map((item) => (
                  <span key={item} className="border rounded-lg px-3 py-1 text-sm">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* タイムライン */}
      <section className="mb-16">
        <h2 className="text-xl font-bold mb-6">タイムライン</h2>
        <div className="relative border-l border-gray-200 pl-6 space-y-8">
          {timeline.map((item, index) => (
            <div key={index} className="relative">
              <div className="absolute -left-[1.625rem] top-1 w-3 h-3 rounded-full bg-gray-300 border-2 border-white" />
              <p className="text-xs text-gray-400 mb-1">{item.year}</p>
              <h3 className="text-sm font-semibold mb-1">{item.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* このブログについて */}
      <section className="mb-16">
        <h2 className="text-xl font-bold mb-6">このブログについて</h2>
        <div className="space-y-3 text-gray-600 text-sm leading-relaxed">
          <p>このブログはNext.js・TypeScript・Supabaseを使って自作しました。</p>
          <p>記事の投稿・編集・削除ができる管理画面、Markdown対応、シンタックスハイライト、検索機能など本格的な機能を実装しています。</p>
          <p>ポートフォリオとして公開しており、副業・就職活動にも活用しています。</p>
        </div>
      </section>

      {/* Contact */}
      <section>
        <h2 className="text-xl font-bold mb-6">Contact</h2>
        <div className="space-y-3">
          <a href="https://github.com/YutoTanno" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between border rounded-lg px-4 py-3 text-sm hover:bg-gray-50 transition-colors">
            <div>
              <span className="font-medium">GitHub</span>
              <p className="text-gray-400 text-xs mt-0.5">ソースコードはこちら</p>
            </div>
            <span className="text-gray-300 text-xs">↗</span>
          </a>
          <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between border rounded-lg px-4 py-3 text-sm hover:bg-gray-50 transition-colors">
            <div>
              <span className="font-medium">X (Twitter)</span>
              <p className="text-gray-400 text-xs mt-0.5">日々の学習をつぶやいています</p>
            </div>
            <span className="text-gray-300 text-xs">↗</span>
          </a>
          <Link href="/blog" className="flex items-center justify-between border rounded-lg px-4 py-3 text-sm hover:bg-gray-50 transition-colors">
            <div>
              <span className="font-medium">Blog</span>
              <p className="text-gray-400 text-xs mt-0.5">技術記事一覧</p>
            </div>
            <span className="text-gray-300 text-xs">→</span>
          </Link>
        </div>
      </section>
    </main>
  )
}
