import { createBrowserClient } from '@supabase/ssr'

export async function uploadImage(file: File, folder: string = 'articles'): Promise<string> {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const ext = file.name.split('.').pop()
  const fileName = `${folder}/${Date.now()}.${ext}`

  const { error } = await supabase.storage
    .from('images')
    .upload(fileName, file, { upsert: false })

  if (error) throw new Error(error.message)

  const { data } = supabase.storage.from('images').getPublicUrl(fileName)
  return data.publicUrl
}