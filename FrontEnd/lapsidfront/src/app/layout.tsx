'use client';

import "../app/globals.css";
import { AuthProvider } from './hooks/useAuth';
import { RouteGuard } from './middleware/RouteGuard';

import Header from "./Components/Header";
import Footer from "./Components/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" style={{ margin: "0 auto", padding: "0 auto", height: "100%"}}>
      <body style={{ margin: "0 auto", padding: "0 auto", height: "100%"}}>
        <AuthProvider>
          <RouteGuard>
            <Header/>
            {children}
            <Footer/>
          </RouteGuard>
        </AuthProvider>
      </body>
    </html>
  );
}
