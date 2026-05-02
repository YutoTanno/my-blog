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

  const { sort } = await searchParams
  const ascending = sort === 'asc'

  const { createClient: createAdmin } = await import('@supabase/supabase-js')
  const adminClient = createAdmin(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

  const { data: siteStats } = await adminClient.from('site_stats').select('total_views').single()
  const { data: articles } = await adminClient.from('articles').select('id, title, slug, created_at, published, view_count').order('created_at', { ascending })

  const published = articles?.filter((a) => a.published) || []
  const drafts = articles?.filter((a) => !a.published) || []

  return (
    <main style={{ maxWidth: '672px', margin: '0 auto', padding: '40px 24px' }}>
      {/* TOTAL VIEWS */}
      <div style={{ background: '#161616', border: '1px solid #2a2a2a', borderLeft: '3px solid #C9A84C', borderRadius: '4px', padding: '16px 20px', marginBottom: '24px' }}>
        <p style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '10px', color: '#555', letterSpacing: '0.2em', marginBottom: '4px' }}>TOTAL VIEWS</p>
        <p style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '36px', color: '#C9A84C', letterSpacing: '0.05em', margin: 0 }}>{siteStats?.total_views ?? 0}</p>
      </div>

      {/* ヘッダー */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <h1 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '28px', color: '#F0EBE0', letterSpacing: '0.05em', margin: 0 }}>管理画面</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <LogoutButton />
          <a href="/admin/new" style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '11px', letterSpacing: '0.1em', background: '#C9A84C', color: '#0e0e0e', padding: '8px 16px', borderRadius: '2px', textDecoration: 'none' }}>
            + NEW
          </a>
        </div>
      </div>

      {/* ソートボタン */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '28px' }}>
        <a href="/admin?sort=desc" style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '10px', letterSpacing: '0.1em', border: `1px solid ${!ascending ? '#C9A84C' : '#2a2a2a'}`, background: !ascending ? '#C9A84C' : 'transparent', color: !ascending ? '#0e0e0e' : '#666', padding: '5px 14px', borderRadius: '2px', textDecoration: 'none' }}>
          NEW →
        </a>
        <a href="/admin?sort=asc" style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '10px', letterSpacing: '0.1em', border: `1px solid ${ascending ? '#C9A84C' : '#2a2a2a'}`, background: ascending ? '#C9A84C' : 'transparent', color: ascending ? '#0e0e0e' : '#666', padding: '5px 14px', borderRadius: '2px', textDecoration: 'none' }}>
          OLD →
        </a>
      </div>

      {/* 下書き */}
      {drafts.length > 0 && (
        <div style={{ marginBottom: '32px' }}>
          <p style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '10px', color: '#555', letterSpacing: '0.2em', marginBottom: '12px' }}>DRAFTS ({drafts.length})</p>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {drafts.map((article: Article) => (
              <li key={article.id} style={{ background: '#161616', border: '1px dashed #2a2a2a', borderRadius: '4px', padding: '14px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
                <div style={{ minWidth: 0 }}>
                  <p style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '16px', color: '#F0EBE0', letterSpacing: '0.05em', margin: '0 0 2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{article.title}</p>
                  <p style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '10px', color: '#555', margin: 0 }}>
                    {new Date(article.created_at).toLocaleDateString('ja-JP')} · {article.view_count ?? 0} VIEWS
                  </p>
                </div>
                <div style={{ display: 'flex', gap: '6px', flexShrink: 0 }}>
                  <a href={`/admin/edit/${article.id}`} style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '10px', border: '1px solid #2a2a2a', color: '#888', padding: '4px 12px', borderRadius: '2px', textDecoration: 'none' }}>
                    EDIT
                  </a>
                  <PublishButton id={article.id} published={false} />
                  <DeleteButton id={article.id} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 公開済み */}
      <div>
        <p style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '10px', color: '#555', letterSpacing: '0.2em', marginBottom: '12px' }}>PUBLISHED ({published.length})</p>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {published.map((article: Article) => (
            <li key={article.id} style={{ background: '#161616', border: '1px solid #2a2a2a', borderLeft: '3px solid #C9A84C', borderRadius: '4px', padding: '14px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
              <div style={{ minWidth: 0 }}>
                <p style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '16px', color: '#F0EBE0', letterSpacing: '0.05em', margin: '0 0 2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{article.title}</p>
                <p style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '10px', color: '#555', margin: 0 }}>
                  {new Date(article.created_at).toLocaleDateString('ja-JP')} · {article.view_count ?? 0} VIEWS
                </p>
              </div>
              <div style={{ display: 'flex', gap: '6px', flexShrink: 0 }}>
                <a href={`/blog/${article.slug}`} style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '10px', border: '1px solid #2a2a2a', color: '#888', padding: '4px 12px', borderRadius: '2px', textDecoration: 'none' }}>
                  VIEW
                </a>
                <a href={`/admin/edit/${article.id}`} style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '10px', border: '1px solid #2a2a2a', color: '#888', padding: '4px 12px', borderRadius: '2px', textDecoration: 'none' }}>
                  EDIT
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
