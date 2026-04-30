import { createClient } from "@/lib/supabase-server";
import { redirect } from "next/navigation";
import DeleteButton from "./DeleteButton";
import LogoutButton from "./LogoutButton";

type Article = {
  id: string;
  title: string;
  slug: string;
  created_at: string;
  published: boolean;
};

export default async function AdminPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");
  const { data: articles } = await supabase
    .from("articles")
    .select("id, title, slug, created_at, published")
    .order("created_at", { ascending: false });
  return (
    <main className="max-w-2xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">管理画面</h1>
        <div className="flex items-center gap-4">
          <LogoutButton />
          <a
            href="/admin/new"
            className="bg-black text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-800"
          >
            新規作成
          </a>
        </div>
      </div>{" "}
      <ul className="space-y-3">
        {articles?.map((article: Article) => (
          <li
            key={article.id}
            className="border rounded-lg p-4 flex items-center justify-between gap-4"
          >
            <div className="min-w-0">
              <p className="font-medium truncate">{article.title}</p>
              <p className="text-xs text-gray-400 mt-1">
                {new Date(article.created_at).toLocaleDateString("ja-JP")}
              </p>
            </div>
            <div className="flex gap-2 shrink-0">
              <a
                href={`/blog/${article.slug}`}
                className="text-xs border px-3 py-1 rounded-lg hover:bg-gray-50"
              >
                表示
              </a>
              <a
                href={`/admin/edit/${article.id}`}
                className="text-xs border px-3 py-1 rounded-lg hover:bg-gray-50"
              >
                編集
              </a>
              <DeleteButton id={article.id} />
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
