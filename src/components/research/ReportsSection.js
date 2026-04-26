import PageContainer from '@/components/shared/PageContainer';
import SectionHeader from '@/components/shared/SectionHeader';
import Card from '@/components/ui/Card';
import Reveal from '@/components/shared/Reveal';
import { publications, workflowPositioning } from '@/data/researchData';

export default function ReportsSection() {
  return (
    <section className="section-shell">
      <PageContainer>
        <SectionHeader
          badge="Reports & Whitepapers"
          title="Whitepapers and reproducible computational workflow positioning."
          description="All research outputs are aligned with international research standards and reproducible computational workflows."
        />
        <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
          <Reveal>
            <Card>
              <h3 className="font-heading text-2xl font-semibold text-white">{publications[3].title}</h3>
              <p className="mt-4 text-sm leading-7 text-slate-300">{publications[3].description}</p>
            </Card>
          </Reveal>
          <Reveal delay={0.08}>
            <Card>
              <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Reproducible Workflow Positioning</p>
              <div className="mt-5 grid gap-3">
                {workflowPositioning.map((item) => (
                  <div key={item} className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-slate-200">
                    {item}
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
