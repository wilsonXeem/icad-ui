'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import useAuth from './useAuth';

const useProtectedRoute = (allowedRoles = []) => {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isAuthenticated, isLoading } = useAuth();
  const isAuthorized = !allowedRoles.length || allowedRoles.includes(user?.role);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace(`/login?next=${encodeURIComponent(pathname)}`);
    }
  }, [isAuthenticated, isLoading, pathname, router]);

  return {
    user,
    isLoading,
    isAuthenticated,
    isAuthorized,
  };
};

export default useProtectedRoute;
