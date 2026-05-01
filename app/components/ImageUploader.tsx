'use client'

import { useRef, useState } from 'react'
import { uploadImage } from '@/lib/uploadImage'

type Props = {
  onUpload: (url: string) => void
  folder?: string
  label?: string
}

export default function ImageUploader({ onUpload, folder = 'articles', label = '画像をアップロード' }: Props) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // バリデーション
    if (!file.type.startsWith('image/')) {
      setError('画像ファイルを選択してください')
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      setError('5MB以下の画像を選択してください')
      return
    }

    setError(null)
    setUploading(true)
    try {
      const url = await uploadImage(file, folder)
      onUpload(url)
    } catch {
      setError('アップロードに失敗しました')
    } finally {
      setUploading(false)
      if (inputRef.current) inputRef.current.value = ''
    }
  }

  return (
    <div>
      <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
      <button type="button" onClick={() => inputRef.current?.click()} disabled={uploading} className="border rounded-lg px-3 py-1.5 text-sm hover:bg-gray-50 transition-colors disabled:opacity-50">
        {uploading ? 'アップロード中...' : label}
      </button>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  )
}
