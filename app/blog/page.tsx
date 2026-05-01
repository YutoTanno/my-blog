import { supabase } from '@/lib/supabase'
import SearchBox from './SearchBox'

export const metadata = {
  title: '記事一覧 | My Blog',
  description: 'Next.js・TypeScriptの学習記録。Web開発の学習過程をアウトプットしています。',
}

export default async function BlogList() {
  const { data: articles } = await supabase.from('articles').select('*').eq('published', true).order('created_at', { ascending: false })

  return (
    <main className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-2">記事一覧</h1>
      <p className="text-gray-400 text-sm mb-8">{articles?.length}件の記事</p>
      <SearchBox articles={articles || []} />
    </main>
  )
}
