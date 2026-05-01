import Link from 'next/link'
import { supabase } from '@/lib/supabase'

export default async function Home() {
  const { data: recentArticles } = await supabase.from('articles').select('id, title, slug, summary, tags, created_at').eq('published', true).order('created_at', { ascending: false }).limit(3)

  return (
    <main>
      {/* Hero */}
      <section style={{ borderBottom: '1px solid #1e1e1e', position: 'relative', overflow: 'hidden' }}>
        {/* 背景のレコード装飾 */}
        <div
          style={{
            position: 'absolute',
            right: '-60px',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '320px',
            height: '320px',
            borderRadius: '50%',
            border: '1px solid #C9A84C11',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            right: '-20px',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '240px',
            height: '240px',
            borderRadius: '50%',
            border: '1px solid #C9A84C1A',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            right: '20px',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '160px',
            height: '160px',
            borderRadius: '50%',
            border: '1px solid #C9A84C22',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            right: '60px',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: '#C9A84C0A',
            border: '1px solid #C9A84C33',
            pointerEvents: 'none',
          }}
        />

        <div style={{ maxWidth: '768px', margin: '0 auto', padding: '80px 24px 80px' }}>
          <p
            style={{
              fontFamily: '"IBM Plex Mono", monospace',
              fontSize: '11px',
              color: '#C9A84C',
              letterSpacing: '0.3em',
              marginBottom: '20px',
            }}>
            WEB DEVELOPER
          </p>
          <h1
            style={{
              fontFamily: '"Bebas Neue", sans-serif',
              fontSize: 'clamp(52px, 10vw, 80px)',
              color: '#F0EBE0',
              letterSpacing: '0.05em',
              lineHeight: 1,
              marginBottom: '24px',
            }}>
            NEXT.JS &<br />
            TYPESCRIPT
            <br />
            <span style={{ color: '#C9A84C' }}>学習記録</span>
          </h1>
          <p
            style={{
              fontSize: '14px',
              color: '#888',
              lineHeight: 1.8,
              marginBottom: '40px',
              maxWidth: '400px',
            }}>
            Web開発の学習過程をアウトプットしています。
            <br />
            副業・ポートフォリオとして公開中。
          </p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Link
              href="/blog"
              style={{
                fontFamily: '"IBM Plex Mono", monospace',
                fontSize: '12px',
                letterSpacing: '0.15em',
                background: '#C9A84C',
                color: '#0e0e0e',
                padding: '12px 28px',
                borderRadius: '2px',
                textDecoration: 'none',
                fontWeight: 500,
              }}>
              LATEST DROPS →
            </Link>
            <a
              href="https://github.com/YutoTanno"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: '"IBM Plex Mono", monospace',
                fontSize: '12px',
                letterSpacing: '0.15em',
                border: '1px solid #2a2a2a',
                color: '#888',
                padding: '12px 28px',
                borderRadius: '2px',
                textDecoration: 'none',
              }}>
              GITHUB ↗
            </a>
          </div>
        </div>
      </section>

      {/* 最新記事 */}
      <section style={{ borderBottom: '1px solid #1e1e1e' }}>
        <div style={{ maxWidth: '768px', margin: '0 auto', padding: '60px 24px' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '32px' }}>
            <h2
              style={{
                fontFamily: '"Bebas Neue", sans-serif',
                fontSize: '28px',
                color: '#F0EBE0',
                letterSpacing: '0.05em',
              }}>
              LATEST DROPS
            </h2>
            <Link
              href="/blog"
              style={{
                fontFamily: '"IBM Plex Mono", monospace',
                fontSize: '10px',
                color: '#C9A84C',
                letterSpacing: '0.15em',
                textDecoration: 'none',
              }}>
              ALL →
            </Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {recentArticles?.map((article, i) => (
              <Link key={article.id} href={`/blog/${article.slug}`} style={{ textDecoration: 'none' }}>
                <div
                  style={{
                    background: '#161616',
                    border: '1px solid #2a2a2a',
                    borderLeft: `3px solid ${i === 0 ? '#C9A84C' : i === 1 ? '#8B2020' : '#2a2a2a'}`,
                    borderRadius: '4px',
                    padding: '16px 20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '16px',
                  }}>
                  <div style={{ minWidth: 0 }}>
                    <p
                      style={{
                        fontFamily: '"IBM Plex Mono", monospace',
                        fontSize: '10px',
                        color: '#555',
                        letterSpacing: '0.1em',
                        marginBottom: '6px',
                      }}>
                      {new Date(article.created_at).toLocaleDateString('ja-JP')}
                    </p>
                    <h3
                      style={{
                        fontFamily: '"Bebas Neue", sans-serif',
                        fontSize: '20px',
                        color: '#F0EBE0',
                        letterSpacing: '0.05em',
                        marginBottom: '4px',
                      }}>
                      {article.title}
                    </h3>
                    <p style={{ fontSize: '12px', color: '#666', margin: 0 }}>{article.summary}</p>
                  </div>
                  <span style={{ color: '#C9A84C', fontSize: '18px', flexShrink: 0 }}>›</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* スキルスタック */}
      <section>
        <div style={{ maxWidth: '768px', margin: '0 auto', padding: '60px 24px' }}>
          <h2
            style={{
              fontFamily: '"Bebas Neue", sans-serif',
              fontSize: '28px',
              color: '#F0EBE0',
              letterSpacing: '0.05em',
              marginBottom: '32px',
            }}>
            SKILL STACK
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px' }}>
            {[
              { name: 'Next.js', sub: 'App Router' },
              { name: 'TypeScript', sub: 'Strict mode' },
              { name: 'Supabase', sub: 'DB & Auth' },
              { name: 'Tailwind CSS', sub: 'v4' },
            ].map((skill) => (
              <div
                key={skill.name}
                style={{
                  background: '#161616',
                  border: '1px solid #2a2a2a',
                  borderRadius: '4px',
                  padding: '16px',
                }}>
                <p
                  style={{
                    fontFamily: '"Bebas Neue", sans-serif',
                    fontSize: '18px',
                    color: '#F0EBE0',
                    letterSpacing: '0.05em',
                    margin: '0 0 4px',
                  }}>
                  {skill.name}
                </p>
                <p
                  style={{
                    fontFamily: '"IBM Plex Mono", monospace',
                    fontSize: '10px',
                    color: '#555',
                    letterSpacing: '0.1em',
                    margin: 0,
                  }}>
                  {skill.sub}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
