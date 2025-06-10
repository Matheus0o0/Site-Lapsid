'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '../context/Auth';

const protectedRoutes = ['/Admin', '/dashboard'];
const adminOnlyRoutes = ['/Admin/usuarios'];
const publicOnlyRoutes = ['/Login', '/cadastro'];

export function RouteGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isAdmin, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkRoute = () => {
      if (isLoading) {
        // Ainda carregando status de autenticação
        return;
      }

      if (isAuthenticated && publicOnlyRoutes.includes(pathname)) {
        console.log('Usuário autenticado tentando acessar rota pública');
        router.push('/Admin');
        return;
      }

      if (protectedRoutes.some(route => pathname.startsWith(route)) && !isAuthenticated) {
        console.log('Usuário não autenticado tentando acessar rota protegida');
        router.push('/Login');
        return;
      }

      if (adminOnlyRoutes.some(route => pathname.startsWith(route)) && !isAdmin) {
        console.log('Usuário não admin tentando acessar rota exclusiva de admin');
        router.push('/dashboard');
        return;
      }

      setIsChecking(false);
    };

    checkRoute();
  }, [pathname, isAuthenticated, isAdmin, isLoading, router]);

  if (isChecking || isLoading) {
    return <div>Verificando permissões...</div>;
  }

  return <>{children}</>;
}
