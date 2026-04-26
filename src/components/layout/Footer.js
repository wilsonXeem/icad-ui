import Link from 'next/link';
import PageContainer from '@/components/shared/PageContainer';
import { footerLinks } from '@/data/navigation';

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-12">
      <PageContainer>
        <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="space-y-4">
            <p className="font-heading text-2xl font-semibold text-white">ICAD</p>
            <p className="max-w-2xl text-sm leading-7 text-slate-300">
              Innovation Centre for Computer-Aided Discovery Ltd. Advancing discovery through artificial
              intelligence, computational science, and high-trust research systems.
            </p>
            <p className="text-sm text-slate-400">Advancing Discovery Through Intelligence.</p>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {footerLinks.map((item) => (
              <Link key={item.href} href={item.href} className="text-sm text-slate-300 hover:text-white">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </PageContainer>
    </footer>
  );
}
