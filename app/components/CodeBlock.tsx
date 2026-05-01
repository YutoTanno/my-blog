'use client'

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism'

export default function CodeBlock({ language, children }: { language: string; children: string }) {
  return (
    <SyntaxHighlighter language={language || 'text'} style={oneLight} customStyle={{ borderRadius: '8px', fontSize: '14px' }}>
      {children}
    </SyntaxHighlighter>
  )
}
