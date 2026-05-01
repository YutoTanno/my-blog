import { supabase } from '@/lib/supabase'
import SearchBox from './SearchBox'

export const metadata = {
  title: '記事一覧 | My Blog',
  description: 'Next.js・TypeScriptの学習記録。Web開発の学習過程をアウトプットしています。',
}

export default async function BlogList() {
  const { data: articles } = await supabase
    .from('articles')
    .select('id, title, slug, summary, tags, created_at, thumbnail_url') // ★ thumbnail_url 追加
    .eq('published', true)
    .order('created_at', { ascending: false })
  return (
    <main style={{ maxWidth: '768px', margin: '0 auto', padding: '60px 24px' }}>
      <div style={{ marginBottom: '40px' }}>
        <p style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '11px', color: '#C9A84C', letterSpacing: '0.3em', marginBottom: '12px' }}>ARCHIVE</p>
        <h1 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '48px', color: '#F0EBE0', letterSpacing: '0.05em', marginBottom: '4px' }}>ALL DROPS</h1>
        <p style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '11px', color: '#555', letterSpacing: '0.1em' }}>{articles?.length} ARTICLES</p>
      </div>
      <SearchBox articles={articles || []} />
    </main>
  )
}
