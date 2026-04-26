'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { navigationLinks } from '@/data/navigation';
import useAuth from '@/hooks/useAuth';
import PrimaryButton from '@/components/ui/PrimaryButton';
import SecondaryButton from '@/components/ui/SecondaryButton';
import PageContainer from '@/components/shared/PageContainer';

const isActivePath = (pathname, href) => pathname === href || pathname.startsWith(`${href}/`);

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const canAccessAdmin = ['admin', 'instructor'].includes(user?.role);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <PageContainer className="pt-4">
        <div className="panel-soft flex items-center justify-between px-4 py-3 sm:px-6">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-accent/30 bg-accent/10 text-sm font-bold text-accent">
              IC
            </div>
            <div>
              <p className="font-heading text-sm font-semibold uppercase tracking-[0.22em] text-white">ICAD</p>
              <p className="text-xs text-slate-400">Innovation through computation</p>
            </div>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {navigationLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm ${
                  isActivePath(pathname, item.href) ? 'text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                {item.label}
              </Link>
            ))}
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                {canAccessAdmin ? (
                  <SecondaryButton href="/admin" className="px-4 py-2.5">
                    Admin
                  </SecondaryButton>
                ) : null}
                <SecondaryButton href="/dashboard" className="px-4 py-2.5">
                  Dashboard
                </SecondaryButton>
                <button
                  onClick={logout}
                  className="text-sm font-medium text-slate-300 hover:text-white"
                  type="button"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <SecondaryButton href="/signup" className="px-4 py-2.5">
                  Sign up
                </SecondaryButton>
                <PrimaryButton href="/login" className="px-4 py-2.5">
                  Login
                </PrimaryButton>
              </div>
            )}
          </nav>

          <button
            type="button"
            onClick={() => setIsOpen((current) => !current)}
            className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-white lg:hidden"
            aria-label="Toggle navigation"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        <AnimatePresence>
          {isOpen ? (
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2 }}
              className="panel-soft mt-3 overflow-hidden p-4 lg:hidden"
            >
              <div className="flex flex-col gap-3">
                {navigationLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`rounded-2xl px-4 py-3 text-sm ${
                      isActivePath(pathname, item.href)
                        ? 'bg-white/[0.08] text-white'
                        : 'text-slate-300 hover:bg-white/[0.04] hover:text-white'
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
                {isAuthenticated ? (
                  <>
                    {canAccessAdmin ? (
                      <SecondaryButton href="/admin" className="w-full" onClick={() => setIsOpen(false)}>
                        Admin
                      </SecondaryButton>
                    ) : null}
                    <PrimaryButton href="/dashboard" className="w-full" onClick={() => setIsOpen(false)}>
                      Dashboard
                    </PrimaryButton>
                    <button
                      type="button"
                      onClick={async () => {
                        await logout();
                        setIsOpen(false);
                      }}
                      className="rounded-2xl border border-white/10 px-4 py-3 text-sm font-semibold text-slate-300 hover:bg-white/[0.04] hover:text-white"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <SecondaryButton href="/signup" className="w-full" onClick={() => setIsOpen(false)}>
                      Sign up
                    </SecondaryButton>
                    <PrimaryButton href="/login" className="w-full" onClick={() => setIsOpen(false)}>
                      Login
                    </PrimaryButton>
                  </>
                )}
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </PageContainer>
    </header>
  );
}
