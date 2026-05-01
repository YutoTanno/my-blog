import Link from 'next/link'

export default function Header() {
  return (
    <header className="border-b">
      <div className="max-w-3xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="font-bold text-lg">
          My Blog
        </Link>
        <nav style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          <Link href="/blog" className="text-sm text-gray-600">
            記事一覧
          </Link>
          <Link href="/about" className="text-sm text-gray-600">
            About
          </Link>
          <a href="https://github.com/YutoTanno" target="_blank" className="text-sm text-gray-600">
            GitHub
          </a>
        </nav>
      </div>
    </header>
  )
}
