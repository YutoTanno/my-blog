'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false })

export default function NewArticlePage() {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [summary, setSummary] = useState('')
  const [content, setContent] = useState('')
  const [tags, setTags] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit() {
    setLoading(true)
    setError('')
    const tagsArray = tags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean)
    const { error } = await supabase.from('articles').insert({
      title,
      slug,
      summary,
      content,
      tags: tagsArray,
      published: true,
    })
    if (error) {
      setError('投稿に失敗しました：' + error.message)
      setLoading(false)
      return
    }
    router.push('/admin')
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">新規記事作成</h1>
        <a href="/admin" className="text-sm text-gray-400 hover:underline">
          管理画面に戻る
        </a>
      </div>
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">タイトル</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full border rounded-lg px-4 py-2 text-sm" placeholder="記事のタイトル" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">スラッグ（URL用）</label>
          <input type="text" value={slug} onChange={(e) => setSlug(e.target.value)} className="w-full border rounded-lg px-4 py-2 text-sm" placeholder="my-first-post" />
          <p className="text-xs text-gray-400 mt-1">英数字とハイフンのみ使用可（例：nextjs-tutorial）</p>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">概要</label>
          <input type="text" value={summary} onChange={(e) => setSummary(e.target.value)} className="w-full border rounded-lg px-4 py-2 text-sm" placeholder="記事の概要を一言で" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">本文（Markdown）</label>
          <div data-color-mode="light">
            <MDEditor value={content} onChange={(v) => setContent(v || '')} height={400} />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">タグ</label>
          <input type="text" value={tags} onChange={(e) => setTags(e.target.value)} className="w-full border rounded-lg px-4 py-2 text-sm" placeholder="Next.js, TypeScript, React" />
          <p className="text-xs text-gray-400 mt-1">カンマ区切りで複数入力できます</p>
        </div>
        <button onClick={handleSubmit} disabled={loading} className="w-full bg-black text-white py-3 rounded-lg text-sm hover:bg-gray-800 disabled:opacity-50">
          {loading ? '投稿中...' : '記事を投稿する'}
        </button>
      </div>
    </main>
  )
}
