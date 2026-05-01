'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'

export default function RecordLoader() {
  const pathname = usePathname()
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const overlay = overlayRef.current
    if (!overlay) return

    overlay.style.opacity = '1'
    overlay.style.pointerEvents = 'auto'

    const fadeTimer = setTimeout(() => {
      overlay.style.transition = 'opacity 0.3s ease'
      overlay.style.opacity = '0'
    }, 600)

    const hideTimer = setTimeout(() => {
      overlay.style.pointerEvents = 'none'
    }, 900)

    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(hideTimer)
    }
  }, [pathname])

  return (
    <div
      ref={overlayRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#0e0e0e',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 0,
        pointerEvents: 'none',
      }}>
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }
        .record {
          animation: spin 1.8s linear infinite;
        }
      `}</style>

      {/* レコード盤 SVG */}
      <svg className="record" width="140" height="140" viewBox="0 0 140 140" xmlns="http://www.w3.org/2000/svg">
        {/* 外周（黒盤面） */}
        <circle cx="70" cy="70" r="68" fill="#111" stroke="#2a2a2a" strokeWidth="1.5" />

        {/* 溝（同心円） */}
        {[52, 46, 40, 34, 28, 22].map((r) => (
          <circle key={r} cx="70" cy="70" r={r} fill="none" stroke="#1e1e1e" strokeWidth="1.5" />
        ))}

        {/* ゴールドリング（レーベルの縁） */}
        <circle cx="70" cy="70" r="20" fill="#C9A84C" />

        {/* レーベル内の装飾ライン */}
        <line x1="70" y1="54" x2="70" y2="58" stroke="#0e0e0e" strokeWidth="1" />
        <line x1="70" y1="82" x2="70" y2="86" stroke="#0e0e0e" strokeWidth="1" />
        <line x1="54" y1="70" x2="58" y2="70" stroke="#0e0e0e" strokeWidth="1" />
        <line x1="82" y1="70" x2="86" y2="70" stroke="#0e0e0e" strokeWidth="1" />

        {/* センターホール */}
        <circle cx="70" cy="70" r="4" fill="#0e0e0e" />

        {/* 光沢ライン（回転感を強調） */}
        <path d="M 70 2 A 68 68 0 0 1 138 70" fill="none" stroke="#ffffff08" strokeWidth="6" strokeLinecap="round" />
      </svg>

      {/* トーンアーム */}
      <div
        style={{
          position: 'absolute',
          width: '2px',
          height: '50px',
          background: 'linear-gradient(to bottom, #C9A84C, #888)',
          borderRadius: '1px',
          transform: 'rotate(30deg)',
          transformOrigin: 'top center',
          top: 'calc(50% - 60px)',
          left: 'calc(50% + 52px)',
        }}
      />

      <div
        style={{
          position: 'absolute',
          bottom: '38%',
          fontFamily: '"IBM Plex Mono", monospace',
          fontSize: '10px',
          color: '#555',
          letterSpacing: '0.3em',
          animation: 'pulse 1s ease infinite',
        }}>
        LOADING...
      </div>
    </div>
  )
}
