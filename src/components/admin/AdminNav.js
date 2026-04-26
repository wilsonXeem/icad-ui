'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { adminNavItems } from '@/data/adminData';
import useAuth from '@/hooks/useAuth';

const isActivePath = (pathname, href) => pathname === href || pathname.startsWith(`${href}/`);

export default function AdminNav() {
  const pathname = usePathname();
  const { user } = useAuth();

  const visibleItems = adminNavItems.filter((item) => item.roles.includes(user?.role));

  return (
    <div className="flex flex-wrap gap-3">
      {visibleItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`rounded-full border px-4 py-2 text-sm font-medium ${
            isActivePath(pathname, item.href)
              ? 'border-accent/40 bg-accent/10 text-accent'
              : 'border-white/10 bg-white/[0.03] text-slate-300 hover:border-white/20 hover:text-white'
          }`}
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
}
