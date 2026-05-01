import { supabase } from '@/lib/supabase'
import Link from 'next/link'

export const metadata = {
  title: '記事一覧 | My Blog',
  description: 'Next.js・TypeScriptの学習記録。Web開発の学習過程をアウトプットしています。',
}

type Article = {
  id: string
  title: string
  slug: string
  summary: string
  tags: string[]
  created_at: string
}

export default async function BlogList() {
  const { data: articles } = await supabase.from('articles').select('*').eq('published', true).order('created_at', { ascending: false })

  return (
    <main className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-2">記事一覧</h1>
      <p className="text-gray-400 text-sm mb-12">{articles?.length}件の記事</p>
      <ul className="space-y-4">
        {articles?.map((article: Article) => (
          <li key={article.id}>
            <Link href={`/blog/${article.slug}`} className="block border rounded-xl p-6 hover:shadow-md transition-shadow">
              <p className="text-xs text-gray-400 mb-2">{new Date(article.created_at).toLocaleDateString('ja-JP')}</p>
              <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
              <p className="text-gray-500 text-sm mb-4">{article.summary}</p>
              <div className="flex gap-2 flex-wrap">
                {article.tags?.map((tag: string) => (
                  <span key={tag} className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}
