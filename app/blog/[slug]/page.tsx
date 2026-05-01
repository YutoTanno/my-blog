import { supabase } from '@/lib/supabase'
import { redirect } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import Link from 'next/link'
import Image from 'next/image'
import CodeBlock from '@/app/components/CodeBlock'
import rehypeRaw from 'rehype-raw'
import ViewTracker from '@/app/components/ViewTracker'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const { data: article } = await supabase.from('articles').select('title, summary').eq('slug', slug).single()
  return {
    title: `${article?.title} | cherrytan`,
    description: article?.summary,
    openGraph: {
      title: `${article?.title} | cherrytan`,
      description: article?.summary,
      url: `https://my-blog-brown-nu.vercel.app/blog/${slug}`,
      siteName: 'cherrytan',
      locale: 'ja_JP',
      type: 'article',
    },
    twitter: {
      card: 'summary',
      title: `${article?.title} | cherrytan`,
      description: article?.summary,
    },
  }
}

export default async function ArticleDetail({ params }: Props) {
  const { slug } = await params
  const { data: article } = await supabase.from('articles').select('*').eq('slug', slug).single()
  if (!article) redirect('/blog')

  return (
    <main style={{ maxWidth: '768px', margin: '0 auto', padding: '48px 24px' }}>
      <ViewTracker slug={article.slug} />
      {/* 戻るリンク */}
      <Link
        href="/blog"
        style={{
          fontFamily: '"IBM Plex Mono", monospace',
          fontSize: '10px',
          color: '#555',
          letterSpacing: '0.15em',
          textDecoration: 'none',
          display: 'inline-block',
          marginBottom: '40px',
        }}>
        ← BACK
      </Link>

      <article>
        {/* アイキャッチ */}
        {article.thumbnail_url && (
          <div style={{ position: 'relative', width: '100%', height: '280px', marginBottom: '40px', borderRadius: '4px', overflow: 'hidden' }}>
            <Image src={article.thumbnail_url} alt={article.title} fill className="object-cover" />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 40%, #0e0e0e)' }} />
          </div>
        )}

        {/* ヘッダー */}
        <div style={{ marginBottom: '40px', borderBottom: '1px solid #1e1e1e', paddingBottom: '32px' }}>
          <p
            style={{
              fontFamily: '"IBM Plex Mono", monospace',
              fontSize: '10px',
              color: '#555',
              letterSpacing: '0.15em',
              marginBottom: '16px',
            }}>
            {new Date(article.created_at).toLocaleDateString('ja-JP')}
          </p>
          <h1
            style={{
              fontFamily: '"Bebas Neue", sans-serif',
              fontSize: 'clamp(32px, 6vw, 52px)',
              color: '#F0EBE0',
              letterSpacing: '0.05em',
              lineHeight: 1.1,
              marginBottom: '20px',
            }}>
            {article.title}
          </h1>
          {article.summary && <p style={{ fontSize: '14px', color: '#888', lineHeight: 1.7, marginBottom: '20px' }}>{article.summary}</p>}
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {article.tags?.map((tag: string) => (
              <span
                key={tag}
                style={{
                  fontFamily: '"IBM Plex Mono", monospace',
                  fontSize: '9px',
                  letterSpacing: '0.1em',
                  border: '1px solid #C9A84C',
                  color: '#C9A84C',
                  padding: '2px 10px',
                  borderRadius: '2px',
                }}>
                {tag}
              </span>
            ))}
          </div>
          {/* 閲覧数 */}
          <p
            style={{
              fontFamily: '"IBM Plex Mono", monospace',
              fontSize: '10px',
              color: '#555',
              letterSpacing: '0.15em',
              marginTop: '12px',
            }}>
            {article.view_count ?? 0} VIEWS
          </p>
        </div>

        {/* 本文 */}
        <div className="prose prose-gray max-w-none">
          <ReactMarkdown
            rehypePlugins={[rehypeRaw]}
            components={{
              code({ className, children }) {
                const match = /language-(\w+)/.exec(className || '')
                const language = match ? match[1] : ''
                const isBlock = className?.includes('language-')
                if (isBlock) {
                  return <CodeBlock language={language}>{String(children)}</CodeBlock>
                }
                return (
                  <code
                    style={{
                      background: '#1a1a1a',
                      color: '#C9A84C',
                      padding: '2px 6px',
                      borderRadius: '2px',
                      fontFamily: '"IBM Plex Mono", monospace',
                      fontSize: '0.85em',
                    }}>
                    {children}
                  </code>
                )
              },
            }}>
            {article.content}
          </ReactMarkdown>
        </div>

        {/* フッター */}
        <div style={{ marginTop: '60px', paddingTop: '32px', borderTop: '1px solid #1e1e1e', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link
            href="/blog"
            style={{
              fontFamily: '"IBM Plex Mono", monospace',
              fontSize: '10px',
              color: '#555',
              letterSpacing: '0.15em',
              textDecoration: 'none',
            }}>
            ← ALL DROPS
          </Link>
          <Link
            href="/about"
            style={{
              fontFamily: '"IBM Plex Mono", monospace',
              fontSize: '10px',
              color: '#C9A84C',
              letterSpacing: '0.15em',
              textDecoration: 'none',
            }}>
            ABOUT →
          </Link>
        </div>
      </article>
    </main>
  )
}
