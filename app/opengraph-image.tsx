import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'cherrytan | HIPHOP Blog'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        background: '#0e0e0e',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '80px',
        position: 'relative',
      }}>
      {/* 背景の同心円装飾 */}
      <div
        style={{
          position: 'absolute',
          right: '-80px',
          top: '50%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          border: '1px solid #C9A84C22',
          transform: 'translateY(-50%)',
          display: 'flex',
        }}
      />
      <div
        style={{
          position: 'absolute',
          right: '20px',
          top: '50%',
          width: '360px',
          height: '360px',
          borderRadius: '50%',
          border: '1px solid #C9A84C33',
          transform: 'translateY(-50%)',
          display: 'flex',
        }}
      />
      <div
        style={{
          position: 'absolute',
          right: '100px',
          top: '50%',
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          border: '2px solid #C9A84C44',
          transform: 'translateY(-50%)',
          display: 'flex',
        }}
      />
      <div
        style={{
          position: 'absolute',
          right: '160px',
          top: '50%',
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          background: '#C9A84C22',
          transform: 'translateY(-50%)',
          display: 'flex',
        }}
      />

      {/* ゴールドライン */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: '#C9A84C',
          display: 'flex',
        }}
      />

      {/* コンテンツ */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div
          style={{
            fontSize: '18px',
            color: '#C9A84C',
            letterSpacing: '0.3em',
            marginBottom: '24px',
            fontFamily: 'monospace',
          }}>
          // HIPHOP BLOG
        </div>
        <div
          style={{
            fontSize: '96px',
            color: '#F0EBE0',
            letterSpacing: '0.05em',
            lineHeight: 1,
            marginBottom: '24px',
            fontWeight: 900,
          }}>
          cherrytan
        </div>
        <div
          style={{
            fontSize: '28px',
            color: '#888',
            letterSpacing: '0.1em',
            fontFamily: 'monospace',
          }}>
          HIPHOP × WEB DEVELOPMENT
        </div>
      </div>

      {/* URLラベル */}
      <div
        style={{
          position: 'absolute',
          bottom: '40px',
          left: '80px',
          fontSize: '16px',
          color: '#444',
          letterSpacing: '0.2em',
          fontFamily: 'monospace',
        }}>
        cherrytan-hiphop.vercel.app
      </div>
    </div>,
    { ...size },
  )
}
