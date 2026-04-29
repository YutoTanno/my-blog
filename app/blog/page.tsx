import { supabase } from "@/lib/supabase";

type Article = {
  id: string;
  title: string;
  slug: string;
  summary: string;
  tags: string[];
  created_at: string;
};

export default async function BlogList() {
  const { data: articles, error } = await supabase
    .from("articles")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    return <p>記事の取得に失敗しました</p>;
  }

  return (
    <main className="max-w-2xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-8">記事一覧</h1>
      <ul className="space-y-6">
        {articles.map((article: Article) => (
          <li
            key={article.id}
            className="border rounded-lg p-6 hover:shadow-md transition"
          >
            <a href={`/blog/${article.slug}`}>
              <p className="text-sm text-gray-400 mb-1">
                {new Date(article.created_at).toLocaleDateString("ja-JP")}
              </p>
              <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
              <p className="text-gray-600 mb-3">{article.summary}</p>
              <div className="flex gap-2">
                {article.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </a>
          </li>
        ))}
      </ul>
    </main>
  );
}
