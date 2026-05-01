'use client'

import { useState } from 'react'
import Link from 'next/link'

type Article = {
  id: string
  title: string
  slug: string
  summary: string
  tags: string[]
  created_at: string
}

export default function SearchBox({ articles }: { articles: Article[] }) {
  const [query, setQuery] = useState('')

  const filtered = articles.filter((article) => {
    const q = query.toLowerCase()
    return article.title.toLowerCase().includes(q) || article.summary?.toLowerCase().includes(q) || article.tags?.some((tag) => tag.toLowerCase().includes(q))
  })

  return (
    <div>
      <div className="relative mb-8">
        <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="記事を検索..." className="w-full border rounded-lg px-4 py-3 text-sm pr-10 focus:outline-none focus:ring-2 focus:ring-gray-200" />
        {query && (
          <button onClick={() => setQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
            ✕
          </button>
        )}
      </div>
      {query && (
        <p className="text-sm text-gray-400 mb-4">
          「{query}」の検索結果：{filtered.length}件
        </p>
      )}
      {filtered.length === 0 ? (
        <p className="text-gray-400 text-sm text-center py-12">記事が見つかりませんでした</p>
      ) : (
        <ul className="space-y-4">
          {filtered.map((article) => (
            <li key={article.id}>
              <Link href={`/blog/${article.slug}`} className="block border rounded-xl p-6 hover:shadow-md transition-shadow">
                <p className="text-xs text-gray-400 mb-2">{new Date(article.created_at).toLocaleDateString('ja-JP')}</p>
                <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
                <p className="text-gray-500 text-sm mb-4">{article.summary}</p>
                <div className="flex gap-2 flex-wrap">
                  {article.tags?.map((tag: string) => (
                    <span key={tag} className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
