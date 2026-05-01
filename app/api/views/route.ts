import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(request: NextRequest) {
  const { slug } = await request.json()
  if (!slug) return NextResponse.json({ error: 'slug required' }, { status: 400 })

  // 記事の閲覧数を+1
  await supabase.rpc('increment_view', { article_slug: slug })

  // サイト全体の総閲覧数を+1
  await supabase.rpc('increment_total_view')

  return NextResponse.json({ ok: true })
}