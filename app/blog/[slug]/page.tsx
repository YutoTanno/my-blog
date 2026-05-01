import { supabase } from '@/lib/supabase'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const { data: article } = await supabase.from('articles').select('title, summary').eq('slug', slug).single()

  return {
    title: `${article?.title} | My Blog`,
    description: article?.summary,
  }
}

export default async function ArticleDetail({ params }: Props) {
  const { slug } = await params

  const { data: article, error } = await supabase.from('articles').select('*').eq('slug', slug).single()

  if (error || !article) {
    return (
      <main className="max-w-2xl mx-auto px-4 py-16">
        <p>記事が見つかりませんでした</p>
        <a href="../blog" className="text-sm text-gray-400 hover:underline">
          記事一覧に戻る
        </a>
      </main>
    )
  }

  return (
    <main className="max-w-2xl mx-auto px-4 py-16">
      <a href="../blog" className="text-sm text-gray-400 hover:underline">
        記事一覧に戻る
      </a>
      <h1 className="text-3xl font-bold mt-4 mb-2">{article.title}</h1>
      <p className="text-gray-400 mb-4">{new Date(article.created_at).toLocaleDateString('ja-JP')}</p>
      <div className="flex gap-2 mb-8">
        {article.tags.map((tag: string) => (
          <span key={tag} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
            {tag}
          </span>
        ))}
      </div>
      <div className="text-gray-800 leading-relaxed">{article.content}</div>
    </main>
  )
}
