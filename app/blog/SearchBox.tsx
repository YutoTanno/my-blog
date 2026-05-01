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
  thumbnail_url?: string
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
      {/* 検索 */}
      <div style={{ position: 'relative', marginBottom: '20px' }}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="SEARCH..."
          style={{
            width: '100%',
            background: '#161616',
            border: '1px solid #2a2a2a',
            borderRadius: '2px',
            padding: '12px 40px 12px 16px',
            fontFamily: '"IBM Plex Mono", monospace',
            fontSize: '12px',
            color: '#F0EBE0',
            letterSpacing: '0.1em',
            outline: 'none',
            boxSizing: 'border-box',
          }}
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            style={{
              position: 'absolute',
              right: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'none',
              border: 'none',
              color: '#555',
              cursor: 'pointer',
              fontSize: '14px',
            }}>
            ✕
          </button>
        )}
      </div>

      {/* タグフィルター */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '32px' }}>
        <button
          onClick={() => setSelectedTag('')}
          style={{
            fontFamily: '"IBM Plex Mono", monospace',
            fontSize: '10px',
            letterSpacing: '0.15em',
            padding: '4px 14px',
            borderRadius: '2px',
            cursor: 'pointer',
            border: `1px solid ${selectedTag === '' ? '#C9A84C' : '#2a2a2a'}`,
            background: selectedTag === '' ? '#C9A84C' : 'transparent',
            color: selectedTag === '' ? '#0e0e0e' : '#666',
          }}>
          ALL
        </button>
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setSelectedTag(selectedTag === tag ? '' : tag)}
            style={{
              fontFamily: '"IBM Plex Mono", monospace',
              fontSize: '10px',
              letterSpacing: '0.15em',
              padding: '4px 14px',
              borderRadius: '2px',
              cursor: 'pointer',
              border: `1px solid ${selectedTag === tag ? '#C9A84C' : '#2a2a2a'}`,
              background: selectedTag === tag ? '#C9A84C' : 'transparent',
              color: selectedTag === tag ? '#0e0e0e' : '#666',
            }}>
            {tag}
          </button>
        ))}
      </div>

      {(query || selectedTag) && <p style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '10px', color: '#555', letterSpacing: '0.1em', marginBottom: '16px' }}>{filtered.length} RESULTS</p>}

      {/* 記事リスト */}
      {filtered.length === 0 ? (
        <p style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '12px', color: '#555', textAlign: 'center', padding: '60px 0' }}>NO RESULTS FOUND</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {filtered.map((article, i) => (
            <li key={article.id}>
              <Link href={`/blog/${article.slug}`} style={{ textDecoration: 'none' }}>
                <div
                  style={{
                    background: '#161616',
                    border: '1px solid #2a2a2a',
                    borderLeft: `3px solid ${i % 2 === 0 ? '#C9A84C' : '#8B2020'}`,
                    borderRadius: '4px',
                    overflow: 'hidden',
                  }}>
                  {article.thumbnail_url && (
                    <div style={{ position: 'relative', width: '100%', height: '180px' }}>
                      <Image src={article.thumbnail_url} alt={article.title} fill className="object-cover" />
                      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 50%, #161616)' }} />
                    </div>
                  )}
                  <div style={{ padding: '16px 20px' }}>
                    <p
                      style={{
                        fontFamily: '"IBM Plex Mono", monospace',
                        fontSize: '10px',
                        color: '#555',
                        letterSpacing: '0.1em',
                        marginBottom: '8px',
                      }}>
                      {new Date(article.created_at).toLocaleDateString('ja-JP')}
                    </p>
                    <h2
                      style={{
                        fontFamily: '"Bebas Neue", sans-serif',
                        fontSize: '22px',
                        color: '#F0EBE0',
                        letterSpacing: '0.05em',
                        marginBottom: '6px',
                      }}>
                      {article.title}
                    </h2>
                    <p style={{ fontSize: '12px', color: '#666', marginBottom: '12px', lineHeight: 1.6 }}>{article.summary}</p>
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                      {article.tags?.map((tag) => (
                        <span
                          key={tag}
                          style={{
                            fontFamily: '"IBM Plex Mono", monospace',
                            fontSize: '9px',
                            letterSpacing: '0.1em',
                            border: `1px solid ${selectedTag === tag ? '#C9A84C' : '#2a2a2a'}`,
                            color: selectedTag === tag ? '#C9A84C' : '#555',
                            padding: '2px 8px',
                            borderRadius: '2px',
                          }}>
                          {tag}
                        </span>
                      ))}
                    </div>
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
