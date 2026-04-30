"use client";

import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function DeleteButton({ id }: { id: string }) {
  const router = useRouter();

  async function handleDelete() {
    if (!confirm("本当に削除しますか？")) return;
    await supabase.from("articles").delete().eq("id", id);
    router.refresh();
  }

  return (
    <button
      onClick={handleDelete}
      className="text-xs border border-red-200 text-red-500 px-3 py-1 rounded-lg hover:bg-red-50"
    >
      削除
    </button>
  );
}
