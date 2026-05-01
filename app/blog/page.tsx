import { supabase } from '@/lib/supabase'
import SearchBox from './SearchBox'

export const metadata = {
  title: '記事一覧 | YutoTanno',
  description: 'Next.js・TypeScriptの学習記録。Web開発の学習過程をアウトプットしています。',
}

const PER_PAGE = 12

type Props = {
  searchParams: Promise<{ page?: string }>
}

export default async function BlogList({ searchParams }: Props) {
  const { page } = await searchParams
  const currentPage = Math.max(1, parseInt(page ?? '1', 10))

  // 総件数取得
  const { count } = await supabase.from('articles').select('*', { count: 'exact', head: true }).eq('published', true)

  const totalPages = Math.ceil((count ?? 0) / PER_PAGE)

  // 該当ページの記事取得
  const { data: articles } = await supabase
    .from('articles')
    .select('id, title, slug, summary, tags, created_at, thumbnail_url')
    .eq('published', true)
    .order('created_at', { ascending: false })
    .range((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE - 1)

  return (
    <main style={{ maxWidth: '768px', margin: '0 auto', padding: '60px 24px' }}>
      <div style={{ marginBottom: '40px' }}>
        <p style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '11px', color: '#C9A84C', letterSpacing: '0.3em', marginBottom: '12px' }}>ARCHIVE</p>
        <h1 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '48px', color: '#F0EBE0', letterSpacing: '0.05em', marginBottom: '4px' }}>ALL DROPS</h1>
        <p style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '11px', color: '#555', letterSpacing: '0.1em' }}>{count} ARTICLES</p>
      </div>

      <SearchBox articles={articles ?? []} />

      {/* ページネーション */}
      {totalPages > 1 && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '48px' }}>
          {currentPage > 1 ? (
            <a href={`/blog?page=${currentPage - 1}`} style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '11px', letterSpacing: '0.15em', border: '1px solid #2a2a2a', color: '#888', padding: '8px 16px', borderRadius: '2px', textDecoration: 'none' }}>
              ← PREV
            </a>
          ) : (
            <span style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '11px', letterSpacing: '0.15em', border: '1px solid #1e1e1e', color: '#333', padding: '8px 16px', borderRadius: '2px' }}>← PREV</span>
          )}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <a key={p} href={`/blog?page=${p}`} style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '11px', letterSpacing: '0.1em', border: `1px solid ${p === currentPage ? '#C9A84C' : '#2a2a2a'}`, background: p === currentPage ? '#C9A84C' : 'transparent', color: p === currentPage ? '#0e0e0e' : '#666', padding: '8px 14px', borderRadius: '2px', textDecoration: 'none', minWidth: '40px', textAlign: 'center' }}>
              {p}
            </a>
          ))}
          {currentPage < totalPages ? (
            <a href={`/blog?page=${currentPage + 1}`} style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '11px', letterSpacing: '0.15em', border: '1px solid #2a2a2a', color: '#888', padding: '8px 16px', borderRadius: '2px', textDecoration: 'none' }}>
              NEXT →
            </a>
          ) : (
            <span style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '11px', letterSpacing: '0.15em', border: '1px solid #1e1e1e', color: '#333', padding: '8px 16px', borderRadius: '2px' }}>NEXT →</span>
          )}
        </div>
      )}

      {totalPages > 1 && (
        <p style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '10px', color: '#555', letterSpacing: '0.1em', textAlign: 'center', marginTop: '16px' }}>
          PAGE {currentPage} / {totalPages}
        </p>
      )}
    </main>
  )
}
