import { supabase } from '@/lib/supabase'
import { redirect } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import Link from 'next/link'
import CodeBlock from '@/app/components/CodeBlock'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const { data: article } = await supabase.from('articles').select('title, summary').eq('slug', slug).single()
  return {
    title: `${article?.title} | My Blog`,
    description: article?.summary,
    openGraph: {
      title: `${article?.title} | My Blog`,
      description: article?.summary,
      url: `https://my-blog-brown-nu.vercel.app/blog/${slug}`,
      siteName: 'My Blog',
      locale: 'ja_JP',
      type: 'article',
    },
    twitter: {
      card: 'summary',
      title: `${article?.title} | My Blog`,
      description: article?.summary,
    },
  }
}

export default async function ArticleDetail({ params }: Props) {
  const { slug } = await params
  const { data: article } = await supabase.from('articles').select('*').eq('slug', slug).single()
  if (!article) redirect('/blog')

  return (
    <main className="max-w-3xl mx-auto px-4 py-16">
      <Link href="/blog" className="text-sm text-gray-400 hover:text-gray-600 mb-8 block">
        記事一覧に戻る
      </Link>
      <article>
        <div className="mb-8">
          <p className="text-sm text-gray-400 mb-3">{new Date(article.created_at).toLocaleDateString('ja-JP')}</p>
          <h1 className="text-4xl font-bold leading-tight mb-4">{article.title}</h1>
          <div className="flex gap-2 flex-wrap">
            {article.tags?.map((tag: string) => (
              <span key={tag} className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="border-t pt-8 prose prose-gray max-w-none">
          <ReactMarkdown
            components={{
              code({ className, children }) {
                const match = /language-(\w+)/.exec(className || '')
                const language = match ? match[1] : ''
                const isBlock = className?.includes('language-')
                if (isBlock) {
                  return <CodeBlock language={language}>{String(children)}</CodeBlock>
                }
                return <code className="bg-gray-100 px-1 py-0.5 rounded text-sm">{children}</code>
              },
            }}>
            {article.content}
          </ReactMarkdown>
        </div>
      </article>
    </main>
  )
}
