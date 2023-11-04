import { Inter } from 'next/font/google'
import { KumaRegistry } from '@kuma-ui/next-plugin/registry'
import './globa.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'cheers-connect',
  description: '居酒屋選びを手助けするWebアプリ',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <KumaRegistry>
          {children}
        </KumaRegistry>
      </body>
    </html>
  )
}
