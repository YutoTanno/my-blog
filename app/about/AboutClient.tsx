'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import ImageUploader from '@/app/components/ImageUploader'
import { createBrowserClient } from '@supabase/ssr'

const supabase = createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

export default function AboutClient() {
  const [profileImage, setProfileImage] = useState<string | null>(null)

  useEffect(() => {
    const loadAvatar = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      const url = user?.user_metadata?.avatar_url
      if (url) setProfileImage(url)
    }
    loadAvatar()
  }, [])

  const handleProfileUpload = async (url: string) => {
    setProfileImage(url)
    await supabase.auth.updateUser({ data: { avatar_url: url } })
  }

  const skills = [
    { category: 'FRONTEND', items: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'] },
    { category: 'BACKEND', items: ['Supabase', 'PostgreSQL', 'REST API'] },
    { category: 'TOOLS', items: ['Git', 'GitHub', 'Vercel', 'VSCode'] },
  ]

  const timeline = [
    { year: '2024', title: 'WEB開発の学習を開始', description: 'HTML・CSS・JavaScriptの基礎から学習開始。' },
    { year: '2024', title: 'REACT・NEXT.JSを習得', description: 'コンポーネント設計・App Routerを学ぶ。' },
    { year: '2025', title: 'このブログを自作・公開', description: 'Supabase・Vercelを使ったフルスタック開発を実践。' },
    { year: '2025', title: '副業・フリーランスを目指して活動中', description: 'ポートフォリオ拡充・案件獲得に向けて準備中。' },
  ]

  return (
    <main style={{ maxWidth: '768px', margin: '0 auto', padding: '60px 24px' }}>
      {/* ページタイトル */}
      <div style={{ marginBottom: '48px' }}>
        <p style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '11px', color: '#C9A84C', letterSpacing: '0.3em', marginBottom: '12px' }}>PROFILE</p>
        <h1 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '48px', color: '#F0EBE0', letterSpacing: '0.05em' }}>ABOUT</h1>
      </div>

      {/* プロフィール */}
      <section style={{ marginBottom: '56px', paddingBottom: '56px', borderBottom: '1px solid #1e1e1e' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '24px' }}>
            {/* アイコン */}
            <div style={{ position: 'relative', flexShrink: 0 }}>
              <div
                style={{
                  width: '88px',
                  height: '88px',
                  borderRadius: '50%',
                  background: '#161616',
                  border: '2px solid #C9A84C33',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                  fontSize: '36px',
                }}>
                {profileImage ? <img src={profileImage} alt="プロフィール" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : '👨‍💻'}
              </div>
              {/* レコード装飾 */}
              <div
                style={{
                  position: 'absolute',
                  inset: '-6px',
                  borderRadius: '50%',
                  border: '1px solid #C9A84C1A',
                  pointerEvents: 'none',
                }}
              />
              <div style={{ position: 'absolute', bottom: '-4px', right: '-4px' }}>
                <ImageUploader folder="profile" label="✏️" onUpload={handleProfileUpload} />
              </div>
            </div>

            <div>
              <h2 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '32px', color: '#F0EBE0', letterSpacing: '0.05em', marginBottom: '4px' }}>YutoTanno</h2>
              <p style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '10px', color: '#C9A84C', letterSpacing: '0.2em', marginBottom: '12px' }}>WEB DEVELOPER</p>
              <p style={{ fontSize: '13px', color: '#888', lineHeight: 1.8 }}>Next.js・TypeScriptを中心にWeb開発を学習しています。このブログは学習記録としてアウトプットする場として作成しました。副業・フリーランスとしての活動も目指しています。</p>
            </div>
          </div>
        </div>
      </section>

      {/* スキル */}
      <section style={{ marginBottom: '56px', paddingBottom: '56px', borderBottom: '1px solid #1e1e1e' }}>
        <h2 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '28px', color: '#F0EBE0', letterSpacing: '0.05em', marginBottom: '28px' }}>SKILL STACK</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {skills.map((skill) => (
            <div key={skill.category}>
              <p style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '10px', color: '#555', letterSpacing: '0.2em', marginBottom: '10px' }}>{skill.category}</p>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {skill.items.map((item) => (
                  <span
                    key={item}
                    style={{
                      fontFamily: '"IBM Plex Mono", monospace',
                      fontSize: '11px',
                      letterSpacing: '0.05em',
                      border: '1px solid #2a2a2a',
                      color: '#888',
                      padding: '6px 14px',
                      borderRadius: '2px',
                    }}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* タイムライン */}
      <section style={{ marginBottom: '56px', paddingBottom: '56px', borderBottom: '1px solid #1e1e1e' }}>
        <h2 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '28px', color: '#F0EBE0', letterSpacing: '0.05em', marginBottom: '28px' }}>TIMELINE</h2>
        <div style={{ borderLeft: '1px solid #2a2a2a', paddingLeft: '24px', display: 'flex', flexDirection: 'column', gap: '28px' }}>
          {timeline.map((item, index) => (
            <div key={index} style={{ position: 'relative' }}>
              <div
                style={{
                  position: 'absolute',
                  left: '-29px',
                  top: '4px',
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  background: index === 0 ? '#C9A84C' : '#2a2a2a',
                  border: `2px solid ${index === 0 ? '#C9A84C' : '#444'}`,
                }}
              />
              <p style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '10px', color: '#C9A84C', letterSpacing: '0.1em', marginBottom: '4px' }}>{item.year}</p>
              <h3 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '18px', color: '#F0EBE0', letterSpacing: '0.05em', marginBottom: '4px' }}>{item.title}</h3>
              <p style={{ fontSize: '13px', color: '#666', lineHeight: 1.7 }}>{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* このブログについて */}
      <section style={{ marginBottom: '56px', paddingBottom: '56px', borderBottom: '1px solid #1e1e1e' }}>
        <h2 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '28px', color: '#F0EBE0', letterSpacing: '0.05em', marginBottom: '20px' }}>THIS BLOG</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {['Next.js・TypeScript・Supabaseを使って自作しました。', '記事の投稿・編集・削除ができる管理画面、Markdown対応、シンタックスハイライト、検索機能など本格的な機能を実装しています。', 'ポートフォリオとして公開しており、副業・就職活動にも活用しています。'].map((text, i) => (
            <p key={i} style={{ fontSize: '13px', color: '#888', lineHeight: 1.8, paddingLeft: '16px', borderLeft: '2px solid #2a2a2a' }}>
              {text}
            </p>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section>
        <h2 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '28px', color: '#F0EBE0', letterSpacing: '0.05em', marginBottom: '20px' }}>CONTACT</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <a
            href="https://github.com/YutoTanno"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: '#161616',
              border: '1px solid #2a2a2a',
              borderLeft: '3px solid #C9A84C',
              borderRadius: '4px',
              padding: '14px 20px',
              textDecoration: 'none',
            }}>
            <div>
              <p style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '16px', color: '#F0EBE0', letterSpacing: '0.05em', margin: '0 0 2px' }}>GITHUB</p>
              <p style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '10px', color: '#555', letterSpacing: '0.05em', margin: 0 }}>ソースコードはこちら</p>
            </div>
            <span style={{ color: '#C9A84C', fontSize: '14px' }}>↗</span>
          </a>
          <a
            href="https://twitter.com/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: '#161616',
              border: '1px solid #2a2a2a',
              borderLeft: '3px solid #8B2020',
              borderRadius: '4px',
              padding: '14px 20px',
              textDecoration: 'none',
            }}>
            <div>
              <p style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '16px', color: '#F0EBE0', letterSpacing: '0.05em', margin: '0 0 2px' }}>X (TWITTER)</p>
              <p style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '10px', color: '#555', letterSpacing: '0.05em', margin: 0 }}>日々の学習をつぶやいています</p>
            </div>
            <span style={{ color: '#C9A84C', fontSize: '14px' }}>↗</span>
          </a>
          <Link
            href="/blog"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: '#161616',
              border: '1px solid #2a2a2a',
              borderLeft: '3px solid #2a2a2a',
              borderRadius: '4px',
              padding: '14px 20px',
              textDecoration: 'none',
            }}>
            <div>
              <p style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '16px', color: '#F0EBE0', letterSpacing: '0.05em', margin: '0 0 2px' }}>BLOG</p>
              <p style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '10px', color: '#555', letterSpacing: '0.05em', margin: 0 }}>技術記事一覧</p>
            </div>
            <span style={{ color: '#C9A84C', fontSize: '14px' }}>→</span>
          </Link>
        </div>
      </section>
    </main>
  )
}
