'use client';

import PageContainer from '@/components/shared/PageContainer';
import ProtectedRoute from '@/components/shared/ProtectedRoute';
import AdminNav from './AdminNav';
import useAuth from '@/hooks/useAuth';

export default function AdminShell({
  title,
  description,
  children,
  allowedRoles = ['admin', 'instructor'],
  unauthorizedTitle,
  unauthorizedDescription,
}) {
  const { user } = useAuth();

  return (
    <ProtectedRoute
      allowedRoles={allowedRoles}
      unauthorizedTitle={unauthorizedTitle || 'Admin access required'}
      unauthorizedDescription={
        unauthorizedDescription || 'This workflow is restricted to approved admin or instructor accounts.'
      }
    >
      <section className="section-shell pt-28">
        <PageContainer>
          <div className="grid gap-8">
            <div className="panel p-8">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.28em] text-accent">Admin Workflow</p>
                  <h1 className="mt-4 font-heading text-3xl font-semibold text-white sm:text-4xl">{title}</h1>
                  <p className="mt-4 max-w-3xl text-sm leading-8 text-slate-300">{description}</p>
                </div>
                <div className="rounded-2xl border border-white/8 bg-white/[0.03] px-5 py-4 text-sm text-slate-300">
                  Signed in as <span className="font-semibold text-white">{user?.role || 'member'}</span>
                </div>
              </div>
            </div>

            <AdminNav />
            {children}
          </div>
        </PageContainer>
      </section>
    </ProtectedRoute>
  );
}
