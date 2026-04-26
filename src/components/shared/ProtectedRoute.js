'use client';

import useProtectedRoute from '@/hooks/useProtectedRoute';
import EmptyState from '@/components/ui/EmptyState';
import Loader from '@/components/ui/Loader';
import SecondaryButton from '@/components/ui/SecondaryButton';

export default function ProtectedRoute({
  children,
  allowedRoles = [],
  unauthorizedTitle = 'Access restricted',
  unauthorizedDescription = 'You do not have permission to view this area.',
}) {
  const { isAuthenticated, isAuthorized, isLoading } = useProtectedRoute(allowedRoles);

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Loader label="Loading secure workspace..." />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  if (!isAuthorized) {
    return (
      <div className="py-12">
        <EmptyState
          title={unauthorizedTitle}
          description={unauthorizedDescription}
          action={<SecondaryButton href="/dashboard">Return to dashboard</SecondaryButton>}
        />
      </div>
    );
  }

  return children;
}
