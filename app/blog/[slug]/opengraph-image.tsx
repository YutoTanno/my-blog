import { ImageResponse } from 'next/og'
import { supabase } from '@/lib/supabase'

export const runtime = 'edge'
export const alt = 'My Blog'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const { data: article } = await supabase.from('articles').select('title, summary').eq('slug', slug).single()

  return new ImageResponse(
    <div style={{ background: '#ffffff', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '80px' }}>
      <div style={{ fontSize: '24px', color: '#9ca3af', marginBottom: '24px' }}>My Blog</div>
      <div style={{ fontSize: '56px', fontWeight: 'bold', color: '#111827', lineHeight: 1.3, marginBottom: '24px' }}>{article?.title}</div>
      <div style={{ fontSize: '28px', color: '#6b7280' }}>{article?.summary}</div>
    </div>,
    { ...size },
  )
}
