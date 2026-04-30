"use client";

import { supabase } from "@/lib/supabase";

export default function LogoutButton() {
  async function handleLogout() {
    await supabase.auth.signOut();
    window.location.href = "/admin/login";
  }

  return (
    <button
      onClick={handleLogout}
      className="text-sm text-gray-400 hover:underline"
    >
      ログアウト
    </button>
  );
}
