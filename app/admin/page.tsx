import { createClient } from '@/lib/supabase-server'
import { redirect } from 'next/navigation'
import DeleteButton from './DeleteButton'
import LogoutButton from './LogoutButton'
import PublishButton from './PublishButton'
export const dynamic = 'force-dynamic'

type Article = { id: string; title: string; slug: string; created_at: string; published: boolean }

export default async function AdminPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect('/admin/login')

  // サービスロールキーで全記事取得（下書き含む）
  const { createClient: createAdmin } = await import('@supabase/supabase-js')
  const adminClient = createAdmin(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

  const { data: articles } = await adminClient.from('articles').select('id, title, slug, created_at, published').order('created_at', { ascending: false })

  const published = articles?.filter((a) => a.published) || []
  const drafts = articles?.filter((a) => !a.published) || []

  return (
    <main className="max-w-2xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">管理画面</h1>
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
