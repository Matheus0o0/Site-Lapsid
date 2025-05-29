'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '../hooks/useAuth';


const protectedRoutes = ['/Admin', '/dashboard'];
const adminOnlyRoutes = ['/Admin/usuarios'];
const publicOnlyRoutes = ['/login', '/cadastro'];

export function RouteGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isAdmin } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkRoute = () => {
      if (isAuthenticated && publicOnlyRoutes.includes(pathname)) {
        console.log('Usuário autenticado tentando acessar rota pública');
        router.push('/Admin');
        return;
      }

      if (protectedRoutes.some(route => pathname.startsWith(route)) && !isAuthenticated) {
        console.log('Usuário não autenticado tentando acessar rota protegida');
        router.push('/login');
        return;
      }

      if (adminOnlyRoutes.some(route => pathname.startsWith(route)) && !isAdmin) {
        console.log('Usuário não admin tentando acessar rota exclusiva de admin');
        router.push('/dashboard');
        return;
      }
    };

    checkRoute();
  }, [pathname, isAuthenticated, isAdmin, router]);

  return <>{children}</>;
} 