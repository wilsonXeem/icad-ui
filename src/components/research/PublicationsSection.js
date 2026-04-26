import PageContainer from '@/components/shared/PageContainer';
import SectionHeader from '@/components/shared/SectionHeader';
import Card from '@/components/ui/Card';
import Reveal from '@/components/shared/Reveal';
import { publications } from '@/data/researchData';

export default function PublicationsSection() {
  return (
    <section className="section-shell">
      <PageContainer>
        <SectionHeader
          badge="Research Library"
          title="Published papers and ongoing research projects positioned for scientific credibility."
          description="ICAD contributes to advancing scientific knowledge through computational research and collaborative innovation."
        />
        <div className="grid gap-6 md:grid-cols-2">
          {publications.slice(0, 2).map((item, index) => (
            <Reveal key={item.title} delay={index * 0.05}>
              <Card>
                <h3 className="font-heading text-2xl font-semibold text-white">{item.title}</h3>
                <p className="mt-4 text-sm leading-7 text-slate-300">{item.description}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </PageContainer>
    </section>
  );
}
