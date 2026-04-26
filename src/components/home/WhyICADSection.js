import { CheckCircle2 } from 'lucide-react';
import PageContainer from '@/components/shared/PageContainer';
import SectionHeader from '@/components/shared/SectionHeader';
import Card from '@/components/ui/Card';
import Reveal from '@/components/shared/Reveal';
import { whyICAD } from '@/data/homeData';

export default function WhyICADSection() {
  return (
    <section className="section-shell">
      <PageContainer>
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <SectionHeader
              badge="Why ICAD"
              title="Designed to feel like a serious scientific institution, not a generic technology brand."
              description="Every layer of the platform is positioned around credibility, computational rigor, and practical research outcomes."
              className="mb-0"
            />
          </Reveal>
          <Reveal delay={0.08}>
            <Card>
              <div className="grid gap-4 sm:grid-cols-2">
                {whyICAD.map((item) => (
                  <div key={item} className="rounded-2xl border border-white/8 bg-white/[0.03] p-5">
                    <CheckCircle2 className="h-5 w-5 text-accent" />
                    <p className="mt-4 text-sm leading-7 text-slate-200">{item}</p>
                  </div>
                ))}
              </div>
            </Card>
          </Reveal>
        </div>
      </PageContainer>
    </section>
  );
}
