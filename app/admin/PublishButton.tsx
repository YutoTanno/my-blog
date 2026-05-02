'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function PublishButton({ id, published }: { id: string; published: boolean }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function handleToggle() {
    setLoading(true)
    await fetch('/api/articles/publish', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, published: !published }),
    })
    setLoading(false)
    router.refresh()
  }

  return (
    <button
      onClick={handleToggle}
      disabled={loading}
      style={{
        fontFamily: '"IBM Plex Mono", monospace',
        fontSize: '10px',
        border: `1px solid ${published ? '#2a2a2a' : '#C9A84C'}`,
        color: published ? '#666' : '#C9A84C',
        padding: '4px 12px',
        borderRadius: '2px',
        background: 'transparent',
        cursor: 'pointer',
        opacity: loading ? 0.5 : 1,
      }}>
      {loading ? '...' : published ? 'UNPUBLISH' : 'PUBLISH'}
    </button>
  )
}
