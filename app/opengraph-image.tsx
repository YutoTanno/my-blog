import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'My Blog'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    <div style={{ background: '#ffffff', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px' }}>
      <div style={{ fontSize: '32px', color: '#9ca3af', marginBottom: '24px' }}>My Blog</div>
      <div style={{ fontSize: '64px', fontWeight: 'bold', color: '#111827', textAlign: 'center', lineHeight: 1.2 }}>Next.js・TypeScriptの学習記録</div>
      <div style={{ fontSize: '28px', color: '#6b7280', marginTop: '32px' }}>Web開発の学習過程をアウトプット</div>
    </div>,
    { ...size },
  )
}
