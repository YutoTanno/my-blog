import Link from 'next/link'

export default function Home() {
  return (
    <main>
      <section className="max-w-3xl mx-auto px-4 py-24 text-center">
        <p className="text-sm text-gray-400 mb-4">Welcome to My Blog</p>
        <h1 className="text-5xl font-bold tracking-tight mb-6">
          Next.js・TypeScriptの
          <br />
          学習記録
        </h1>
        <p className="text-gray-500 text-lg mb-10">
          Web開発の学習過程をアウトプットしています。
          <br />
          副業・ポートフォリオとして公開中。
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/blog" className="bg-black text-white px-6 py-3 rounded-lg text-sm hover:bg-gray-800">
            記事を読む
          </Link>
          <a href="https://github.com/YutoTanno" target="_blank" className="border px-6 py-3 rounded-lg text-sm hover:bg-gray-50">
            GitHubを見る
          </a>
        </div>
      </section>
      <section className="border-t">
        <div className="max-w-3xl mx-auto px-4 py-16">
          <h2 className="text-xl font-bold mb-8">スキルスタック</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {['Next.js', 'TypeScript', 'Supabase', 'Tailwind CSS'].map((skill) => (
              <div key={skill} className="border rounded-lg p-4 text-center text-sm font-medium">
                {skill}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
