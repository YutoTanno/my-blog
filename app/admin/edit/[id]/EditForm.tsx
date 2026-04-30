"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

type Article = {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  tags: string[];
  published: boolean;
};

export default function EditForm({ article }: { article: Article }) {
  const router = useRouter();
  const [title, setTitle] = useState(article.title);
  const [slug, setSlug] = useState(article.slug);
  const [summary, setSummary] = useState(article.summary || "");
  const [content, setContent] = useState(article.content || "");
  const [tags, setTags] = useState(article.tags?.join(", ") || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleUpdate() {
    setLoading(true);
    setError("");

    const tagsArray = tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const { error } = await supabase
      .from("articles")
      .update({
        title,
        slug,
        summary,
        content,
        tags: tagsArray,
      })
      .eq("id", article.id);

    if (error) {
      setError("更新に失敗しました：" + error.message);
      setLoading(false);
      return;
    }

    router.push("/admin");
  }

  return (
    <div className="space-y-4">
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <div>
        <label className="block text-sm font-medium mb-1">タイトル</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border rounded-lg px-4 py-2 text-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">
          スラッグ（URL用）
        </label>
        <input
          type="text"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          className="w-full border rounded-lg px-4 py-2 text-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">概要</label>
        <input
          type="text"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          className="w-full border rounded-lg px-4 py-2 text-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">本文</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full border rounded-lg px-4 py-2 text-sm h-48 resize-none"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">タグ</label>
        <input
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="w-full border rounded-lg px-4 py-2 text-sm"
        />
        <p className="text-xs text-gray-400 mt-1">
          カンマ区切りで複数入力できます
        </p>
      </div>
      <button
        onClick={handleUpdate}
        disabled={loading}
        className="w-full bg-black text-white py-3 rounded-lg text-sm hover:bg-gray-800 disabled:opacity-50"
      >
        {loading ? "更新中..." : "記事を更新する"}
      </button>
    </div>
  );
}
