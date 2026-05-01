'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Header() {
  const pathname = usePathname()

  const linkStyle = (href: string) => ({
    fontFamily: '"IBM Plex Mono", monospace',
    fontSize: '11px',
    letterSpacing: '0.15em',
    textDecoration: 'none',
    color: pathname === href ? '#C9A84C' : '#666',
  })

  return (
    <header style={{ background: '#111', borderBottom: '1px solid #C9A84C33', position: 'sticky', top: 0, zIndex: 50 }}>
      <div style={{ maxWidth: '768px', margin: '0 auto', padding: '0 24px', height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'baseline', gap: '6px', textDecoration: 'none' }}>
          <span style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '22px', color: '#C9A84C', letterSpacing: '0.08em' }}>YutoTanno</span>
          <span style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '9px', color: '#555', letterSpacing: '0.2em' }}>DEV</span>
        </Link>
        <nav style={{ display: 'flex', gap: '28px', alignItems: 'center' }}>
          <Link href="/blog" style={linkStyle('/blog')}>
            BLOG
          </Link>
          <Link href="/about" style={linkStyle('/about')}>
            ABOUT
          </Link>
        </nav>
      </div>
    </header>
  )
}
