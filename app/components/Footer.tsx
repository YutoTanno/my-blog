import Link from 'next/link'

export default function Footer() {
  return (
    <footer style={{ background: '#0a0a0a', borderTop: '1px solid #1e1e1e', marginTop: '80px' }}>
      <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, #C9A84C55, transparent)' }} />
      <div style={{ maxWidth: '768px', margin: '0 auto', padding: '20px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link href="/" style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '16px', color: '#C9A84C', letterSpacing: '0.08em', textDecoration: 'none', opacity: 0.7 }}>
          YutoTanno
        </Link>
        <p style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '10px', color: '#444', letterSpacing: '0.2em', margin: 0 }}>© 2026 YUTOTANNO</p>
        <div style={{ display: 'flex', gap: '20px' }}>
          <a href="https://github.com/YutoTanno" target="_blank" rel="noopener noreferrer" style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '10px', color: '#555', letterSpacing: '0.15em', textDecoration: 'none' }}>
            GITHUB
          </a>
          <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '10px', color: '#555', letterSpacing: '0.15em', textDecoration: 'none' }}>
            X
          </a>
        </div>
      </div>
    </footer>
  )
}
