'use client';

import { Inter } from 'next/font/google'
import './globals.css'
import Header from './Components/Header'
import { AuthProvider } from './context/Auth'
import { RouteGuard } from './middleware/RouteGuard'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" style={{ margin: "0 auto", padding: "0 auto", height: "100%"}}>
      <body suppressHydrationWarning style={{ margin: "0 auto", padding: "0 auto", height: "100%"}}>
        <AuthProvider>
          <div className={inter.className}>
            <RouteGuard>
              <Header/>
              {children}
            </RouteGuard>
          </div>
        </AuthProvider>
      </body>
    </html>
  )
}
