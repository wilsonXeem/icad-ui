import PageContainer from '@/components/shared/PageContainer';
import SectionHeader from '@/components/shared/SectionHeader';
import Reveal from '@/components/shared/Reveal';
import Card from '@/components/ui/Card';
import { packageComparisonRows, servicePackages } from '@/data/servicesData';
import PackageCard from './PackageCard';

export default function PackagesSection() {
  return (
    <section className="section-shell">
      <PageContainer>
        <SectionHeader
          badge="Service Packages"
          title="Three structured tiers from screening and interaction to elite discovery depth."
          description="The package architecture is designed as a clear pathway from preliminary evaluation to publication-grade, AI-driven discovery support."
        />
        <div className="grid gap-6 lg:grid-cols-3">
          {servicePackages.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.06}>
              <PackageCard item={item} featured={index === 0} />
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.12} className="mt-8">
          <Card className="overflow-hidden p-0">
            <div className="border-b border-white/8 px-6 py-5">
              <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Capability Comparison</p>
              <p className="mt-3 text-sm leading-7 text-slate-300">
                All tiers are executed using reproducible computational workflows aligned with international research
                and publication standards.
              </p>
            </div>
            <div className="overflow-x-auto">
              <div className="min-w-[960px]">
                <div className="grid grid-cols-[220px_repeat(3,minmax(0,1fr))] border-b border-white/8 text-sm">
                  <div className="px-5 py-4 text-slate-400">Capability</div>
                  {servicePackages.map((item) => (
                    <div key={item.title} className="px-5 py-4 font-semibold text-white">
                      {item.title}
                    </div>
                  ))}
                </div>
                {packageComparisonRows.map((row) => (
                  <div
                    key={row.label}
                    className="grid grid-cols-[220px_repeat(3,minmax(0,1fr))] border-b border-white/8 text-sm last:border-b-0"
                  >
                    <div className="px-5 py-4 text-slate-300">{row.label}</div>
                    {row.values.map((value, index) => (
                      <div key={`${row.label}-${index}`} className="px-5 py-4 text-slate-400">
                        {value}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </Reveal>
      </PageContainer>
    </section>
  );
}
