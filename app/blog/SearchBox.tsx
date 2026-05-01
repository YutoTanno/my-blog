'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

type Article = {
  id: string
  title: string
  slug: string
  summary: string
  tags: string[]
  created_at: string
  thumbnail_url?: string // ★追加
}

export default function SearchBox({ articles }: { articles: Article[] }) {
  const [query, setQuery] = useState('')
  const [selectedTag, setSelectedTag] = useState('')

  const allTags = [...new Set(articles.flatMap((a) => a.tags || []))]

  const filtered = articles.filter((article) => {
    const q = query.toLowerCase()
    const matchQuery = article.title.toLowerCase().includes(q) || article.summary?.toLowerCase().includes(q) || article.tags?.some((tag) => tag.toLowerCase().includes(q))
    const matchTag = selectedTag ? article.tags?.includes(selectedTag) : true
    return matchQuery && matchTag
  })

  return (
    <div>
      <div className="relative mb-6">
        <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="記事を検索..." className="w-full border rounded-lg px-4 py-3 text-sm pr-10 focus:outline-none focus:ring-2 focus:ring-gray-200" />
        {query && (
          <button onClick={() => setQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
            ✕
          </button>
        )}
      </div>
      <div className="flex gap-2 flex-wrap mb-8">
        <button onClick={() => setSelectedTag('')} className={`text-xs px-3 py-1 rounded-full border transition-colors ${selectedTag === '' ? 'bg-black text-white border-black' : 'hover:bg-gray-50'}`}>
          すべて
        </button>
        {allTags.map((tag) => (
          <button key={tag} onClick={() => setSelectedTag(selectedTag === tag ? '' : tag)} className={`text-xs px-3 py-1 rounded-full border transition-colors ${selectedTag === tag ? 'bg-black text-white border-black' : 'hover:bg-gray-50'}`}>
            {tag}
          </button>
        ))}
      </div>
      {(query || selectedTag) && <p className="text-sm text-gray-400 mb-4">{filtered.length}件の記事</p>}
      {filtered.length === 0 ? (
        <p className="text-gray-400 text-sm text-center py-12">記事が見つかりませんでした</p>
      ) : (
        <ul className="space-y-4">
          {filtered.map((article) => (
            <li key={article.id}>
              <Link href={`/blog/${article.slug}`} className="block border rounded-xl overflow-hidden hover:shadow-md transition-shadow">
                {/* ★追加: アイキャッチ画像 */}
                {article.thumbnail_url && (
                  <div className="relative w-full h-48">
                    <Image src={article.thumbnail_url} alt={article.title} fill className="object-cover" />
                  </div>
                )}
                <div className="p-6">
                  <p className="text-xs text-gray-400 mb-2">{new Date(article.created_at).toLocaleDateString('ja-JP')}</p>
                  <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
                  <p className="text-gray-500 text-sm mb-4">{article.summary}</p>
                  <div className="flex gap-2 flex-wrap">
                    {article.tags?.map((tag: string) => (
                      <span key={tag} className={`text-xs px-3 py-1 rounded-full ${selectedTag === tag ? 'bg-black text-white' : 'bg-gray-100 text-gray-600'}`}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
