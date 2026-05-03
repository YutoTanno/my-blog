'use client'

import { useEffect, useRef } from 'react'

interface TwitterWidgets {
  load: (element?: HTMLElement | null) => void
}

interface TwitterGlobal {
  widgets?: TwitterWidgets
}

declare global {
  interface Window {
    twttr?: TwitterGlobal
  }
}

export default function XEmbed({ tweetUrl }: { tweetUrl: string }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return

    const container = ref.current
    container.innerHTML = ''

    const blockquote = document.createElement('blockquote')
    blockquote.className = 'twitter-tweet'
    blockquote.setAttribute('data-theme', 'dark')

    const anchor = document.createElement('a')
    anchor.href = tweetUrl
    anchor.textContent = tweetUrl
    blockquote.appendChild(anchor)
    container.appendChild(blockquote)

    const existingScript = document.getElementById('twitter-widget-script')
    if (existingScript) {
      setTimeout(() => {
        window.twttr?.widgets?.load(container)
      }, 500)
      return
    }

    const script = document.createElement('script')
    script.id = 'twitter-widget-script'
    script.src = 'https://platform.twitter.com/widgets.js'
    script.async = true
    script.charset = 'utf-8'
    document.body.appendChild(script)

    const interval = setInterval(() => {
      if (window.twttr?.widgets) {
        window.twttr.widgets.load(container)
        clearInterval(interval)
      }
    }, 100) // ★ 200 → 100ms に短縮

    // タイムアウト設定（10秒後に諦める）
    const timeout = setTimeout(() => {
      clearInterval(interval)
    }, 10000)

    return () => {
      clearInterval(interval)
      clearTimeout(timeout)
    }
  }, [tweetUrl])

  return <div ref={ref} style={{ margin: '24px 0' }} />
}
