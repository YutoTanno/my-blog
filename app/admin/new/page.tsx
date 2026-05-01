'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import ImageUploader from '@/app/components/ImageUploader'

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false })

export default function NewArticlePage() {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [summary, setSummary] = useState('')
  const [content, setContent] = useState('')
  const [tags, setTags] = useState('')
  const [thumbnailUrl, setThumbnailUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(published: boolean) {
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
      published,
      thumbnail_url: thumbnailUrl,
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
        {/* アイキャッチ画像 */}
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
          {/* 本文への画像挿入 */}
          <div className="mt-2">
            <ImageUploader folder="articles" label="📷 本文に画像を挿入" onUpload={(url) => setContent((prev) => `${prev}\n\n![画像](${url})\n`)} />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">タグ</label>
          <input type="text" value={tags} onChange={(e) => setTags(e.target.value)} className="w-full border rounded-lg px-4 py-2 text-sm" placeholder="Next.js, TypeScript, React" />
          <p className="text-xs text-gray-400 mt-1">カンマ区切りで複数入力できます</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => handleSubmit(false)} disabled={loading} className="flex-1 border py-3 rounded-lg text-sm hover:bg-gray-50 disabled:opacity-50">
            下書き保存
          </button>
          <button onClick={() => handleSubmit(true)} disabled={loading} className="flex-1 bg-black text-white py-3 rounded-lg text-sm hover:bg-gray-800 disabled:opacity-50">
            {loading ? '投稿中...' : '記事を投稿する'}
          </button>
        </div>
      </div>
    </main>
  )
}
