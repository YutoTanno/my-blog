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
    window.location.reload()
  }

  return (
    <button onClick={handleToggle} disabled={loading} className={`text-xs border px-3 py-1 rounded-lg disabled:opacity-50 ${published ? 'text-gray-500 hover:bg-gray-50' : 'text-green-600 border-green-200 hover:bg-green-50'}`}>
      {loading ? '処理中...' : published ? '非公開にする' : '公開する'}
    </button>
  )
}
