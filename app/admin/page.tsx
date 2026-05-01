import { createClient } from '@/lib/supabase-server'
import { redirect } from 'next/navigation'
import DeleteButton from './DeleteButton'
import LogoutButton from './LogoutButton'
import PublishButton from './PublishButton'
export const dynamic = 'force-dynamic'

type Article = { id: string; title: string; slug: string; created_at: string; published: boolean; view_count: number }
type Props = { searchParams: Promise<{ sort?: string }> }

export default async function AdminPage({ searchParams }: Props) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect('/admin/login')

  // サービスロールキーで全記事取得（下書き含む）
  const { sort } = await searchParams
  const ascending = sort === 'asc'

  const { createClient: createAdmin } = await import('@supabase/supabase-js')
  const adminClient = createAdmin(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)
  // 総閲覧数取得
  const { data: siteStats } = await adminClient.from('site_stats').select('total_views').single()
  const { data: articles } = await adminClient
    .from('articles')
    .select('id, title, slug, created_at, published, view_count') // ★ view_count 追加
    .order('created_at', { ascending })
  const published = articles?.filter((a) => a.published) || []
  const drafts = articles?.filter((a) => !a.published) || []

  return (
    <main className="max-w-2xl mx-auto px-4 py-10">
      {/* 閲覧数サマリー */}
      <div
        style={{
          background: '#161616',
          border: '1px solid #2a2a2a',
          borderLeft: '3px solid #C9A84C',
          borderRadius: '4px',
          padding: '16px 20px',
          marginBottom: '24px',
        }}>
        <p style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '10px', color: '#555', letterSpacing: '0.2em', marginBottom: '4px' }}>TOTAL VIEWS</p>
        <p style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '36px', color: '#C9A84C', letterSpacing: '0.05em' }}>{siteStats?.total_views ?? 0}</p>
      </div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">管理画面</h1>
        {/* ソートボタン */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
          <a
            href="/admin?sort=desc"
            style={{
              fontFamily: '"IBM Plex Mono", monospace',
              fontSize: '10px',
              letterSpacing: '0.1em',
              border: `1px solid ${!ascending ? '#C9A84C' : '#2a2a2a'}`,
              background: !ascending ? '#C9A84C' : 'transparent',
              color: !ascending ? '#0e0e0e' : '#666',
              padding: '5px 14px',
              borderRadius: '2px',
              textDecoration: 'none',
            }}>
            NEW →
          </a>
          <a
            href="/admin?sort=asc"
            style={{
              fontFamily: '"IBM Plex Mono", monospace',
              fontSize: '10px',
              letterSpacing: '0.1em',
              border: `1px solid ${ascending ? '#C9A84C' : '#2a2a2a'}`,
              background: ascending ? '#C9A84C' : 'transparent',
              color: ascending ? '#0e0e0e' : '#666',
              padding: '5px 14px',
              borderRadius: '2px',
              textDecoration: 'none',
            }}>
            OLD →
          </a>
        </div>
        <div className="flex items-center gap-4">
          <LogoutButton />
          <a href="/admin/new" className="bg-black text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-800">
            新規作成
          </a>
        </div>
      </div>
      {drafts.length > 0 && (
        <div className="mb-8">
          <h2 className="text-sm font-medium text-gray-400 mb-3">下書き（{drafts.length}件）</h2>
          <ul className="space-y-3">
            {drafts.map((article: Article) => (
              <li key={article.id} className="border border-dashed rounded-lg p-4 flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <p className="font-medium truncate">{article.title}</p>
                  <p className="text-xs text-gray-400 mt-1">{new Date(article.created_at).toLocaleDateString('ja-JP')}</p>
                  <p style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '10px', color: '#555', marginTop: '2px' }}>{article.view_count ?? 0} VIEWS</p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <a href={`/admin/edit/${article.id}`} className="text-xs border px-3 py-1 rounded-lg hover:bg-gray-50">
                    編集
                  </a>
                  <PublishButton id={article.id} published={false} />
                  <DeleteButton id={article.id} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div>
        <h2 className="text-sm font-medium text-gray-400 mb-3">公開済み（{published.length}件）</h2>
        <ul className="space-y-3">
          {published.map((article: Article) => (
            <li key={article.id} className="border rounded-lg p-4 flex items-center justify-between gap-4">
              <div className="min-w-0">
                <p className="font-medium truncate">{article.title}</p>
                <p className="text-xs text-gray-400 mt-1">{new Date(article.created_at).toLocaleDateString('ja-JP')}</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <a href={`/blog/${article.slug}`} className="text-xs border px-3 py-1 rounded-lg hover:bg-gray-50">
                  表示
                </a>
                <a href={`/admin/edit/${article.id}`} className="text-xs border px-3 py-1 rounded-lg hover:bg-gray-50">
                  編集
                </a>
                <PublishButton id={article.id} published={true} />
                <DeleteButton id={article.id} />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </main>
  )
}
