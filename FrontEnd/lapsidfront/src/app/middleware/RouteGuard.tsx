'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '../hooks/useAuth';

const protectedRoutes = ['/testeAdmin', '/dashboard'];
const adminRoutes = ['/testeAdmin'];
const publicOnlyRoutes = ['/login', '/cadastro'];

export function RouteGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isAdmin, user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {

    const checkRoute = () => {
      if (isAuthenticated && publicOnlyRoutes.includes(pathname)) {
        console.log('Usuário autenticado tentando acessar rota pública');
        router.push(isAdmin ? '/testeAdmin' : '/dashboard');
        return;
      }

      if (protectedRoutes.includes(pathname) && !isAuthenticated) {
        console.log('Usuário não autenticado tentando acessar rota protegida');
        router.push('/login');
        return;
      }

      if (adminRoutes.includes(pathname) && !isAdmin) {
        console.log('Usuário não admin tentando acessar rota de admin');
        router.push('/dashboard');
        return;
      }
    };

    checkRoute();
  }, [pathname, isAuthenticated, isAdmin, router]);

  return <>{children}</>;
} 