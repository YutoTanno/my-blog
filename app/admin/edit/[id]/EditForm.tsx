'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import ImageUploader from '@/app/components/ImageUploader'
const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false })

type Article = {
  id: string
  title: string
  slug: string
  summary: string
  content: string
  tags: string[]
  published: boolean
  thumbnail_url?: string
}

export default function EditForm({ article }: { article: Article }) {
  const router = useRouter()
  const [title, setTitle] = useState(article.title)
  const [slug, setSlug] = useState(article.slug)
  const [summary, setSummary] = useState(article.summary || '')
  const [content, setContent] = useState(article.content || '')
  const [tags, setTags] = useState(article.tags?.join(', ') || '')
  const [thumbnailUrl, setThumbnailUrl] = useState(article.thumbnail_url ?? '')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleUpdate() {
    setLoading(true)
    setError('')
    const tagsArray = tags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean)

    const res = await fetch('/api/articles/update', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: article.id,
        title,
        slug,
        summary,
        content,
        tags: tagsArray,
        thumbnail_url: thumbnailUrl,
      }),
    })

    if (!res.ok) {
      const data = await res.json()
      setError('更新に失敗しました：' + data.error)
      setLoading(false)
      return
    }

    router.push('/admin')
  }

  return (
    <div className="space-y-4">
      {error && <p className="text-red-500 text-sm">{error}</p>}

      {/* ★追加: アイキャッチ画像 */}
      <div>
        <label className="block text-sm font-medium mb-2">アイキャッチ画像</label>
        {thumbnailUrl && (
          <div className="relative w-full h-48 mb-2">
            <Image src={thumbnailUrl} alt="アイキャッチ" fill className="object-cover rounded-lg" />
          </div>
        )}
        <ImageUploader folder="articles" label="📷 アイキャッチをアップロード" onUpload={(url) => setThumbnailUrl(url)} />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">タイトル</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full border rounded-lg px-4 py-2 text-sm" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">スラッグ（URL用）</label>
        <input type="text" value={slug} onChange={(e) => setSlug(e.target.value)} className="w-full border rounded-lg px-4 py-2 text-sm" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">概要</label>
        <input type="text" value={summary} onChange={(e) => setSummary(e.target.value)} className="w-full border rounded-lg px-4 py-2 text-sm" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">本文（Markdown）</label>
        <div data-color-mode="light">
          <MDEditor value={content} onChange={(v) => setContent(v || '')} height={400} />
        </div>
        {/* ★追加: 本文への画像挿入 */}
        <div className="mt-2">
          <ImageUploader folder="articles" label="📷 本文に画像を挿入" onUpload={(url) => setContent((prev) => `${prev}\n\n![画像](${url})\n`)} />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">タグ</label>
        <input type="text" value={tags} onChange={(e) => setTags(e.target.value)} className="w-full border rounded-lg px-4 py-2 text-sm" />
        <p className="text-xs text-gray-400 mt-1">カンマ区切りで複数入力できます</p>
      </div>
      <button onClick={handleUpdate} disabled={loading} className="w-full bg-black text-white py-3 rounded-lg text-sm hover:bg-gray-800 disabled:opacity-50">
        {loading ? '更新中...' : '記事を更新する'}
      </button>
    </div>
  )
}
