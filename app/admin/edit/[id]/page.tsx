import { createClient } from '@/lib/supabase-server'
import { redirect } from 'next/navigation'
import EditForm from './EditForm'

type Props = { params: Promise<{ id: string }> }

export default async function EditPage({ params }: Props) {
  const { id } = await params
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect('/admin/login')

  // ★ service role で取得（下書きも含む）
  const { createClient: createAdmin } = await import('@supabase/supabase-js')
  const adminClient = createAdmin(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

  const { data: article } = await adminClient.from('articles').select('*').eq('id', id).single()

  if (!article) redirect('/admin')

  return (
    <main className="max-w-2xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">記事を編集</h1>
        <a href="/admin" className="text-sm text-gray-400 hover:underline">
          管理画面に戻る
        </a>
      </div>
      <EditForm article={article} />
    </main>
  )
}
