import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t mt-24">
      <div className="max-w-3xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-sm text-gray-400">
          My Blog
        </Link>
        <p className="text-sm text-gray-400">© 2026 YutoTanno</p>
      </div>
    </footer>
  )
}
