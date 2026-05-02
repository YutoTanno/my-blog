'use client'

import { useRouter } from 'next/navigation'

export default function DeleteButton({ id }: { id: string }) {
  const router = useRouter()

  async function handleDelete() {
    if (!confirm('本当に削除しますか？')) return

    const res = await fetch('/api/articles/delete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })

    if (!res.ok) {
      const data = await res.json()
      alert('削除に失敗しました：' + data.error)
      return
    }

    router.refresh()
  }

  return (
    <button
      onClick={handleDelete}
      style={{
        fontFamily: '"IBM Plex Mono", monospace',
        fontSize: '10px',
        border: '1px solid #8B2020',
        color: '#8B2020',
        padding: '4px 12px',
        borderRadius: '2px',
        background: 'transparent',
        cursor: 'pointer',
      }}>
      DEL
    </button>
  )
}
