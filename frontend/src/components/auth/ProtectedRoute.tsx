'use client';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      if (!isAuthenticated && !pathname.startsWith('/login') && !pathname.startsWith('/register')) {
        router.push('/login');
      }
    }
  }, [isAuthenticated, router, pathname, isMounted]);

  // Don't render anything until mounted to prevent hydration errors from Zustand persist
  if (!isMounted) return null;

  if (!isAuthenticated && !pathname.startsWith('/login') && !pathname.startsWith('/register')) {
    return null; // Avoid flashing protected content before redirect
  }

  return <>{children}</>;
}
