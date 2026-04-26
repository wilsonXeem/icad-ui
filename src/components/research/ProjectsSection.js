import PageContainer from '@/components/shared/PageContainer';
import SectionHeader from '@/components/shared/SectionHeader';
import Card from '@/components/ui/Card';
import Reveal from '@/components/shared/Reveal';
import { publications } from '@/data/researchData';

export default function ProjectsSection() {
  return (
    <section className="section-shell">
      <PageContainer>
        <SectionHeader
          badge="Projects"
          title="Technical reports and ongoing projects arranged within a clear research surface."
          description="These sections are structured to evolve into richer project and reporting views without losing institutional clarity."
        />
        <div className="grid gap-6 md:grid-cols-2">
          {publications.slice(2, 3).map((item) => (
            <Reveal key={item.title}>
              <Card>
                <h3 className="font-heading text-2xl font-semibold text-white">{item.title}</h3>
                <p className="mt-4 text-sm leading-7 text-slate-300">{item.description}</p>
              </Card>
            </Reveal>
          ))}
          <Reveal delay={0.08}>
            <Card>
              <p className="text-xs uppercase tracking-[0.28em] text-accentWarm">Positioning</p>
              <p className="mt-4 text-base leading-8 text-slate-200">
                Future project detail can include collaborators, workflow outputs, reporting assets, and
                reproducibility notes aligned with international research expectations.
              </p>
            </Card>
          </Reveal>
        </div>
      </PageContainer>
    </section>
  );
}
