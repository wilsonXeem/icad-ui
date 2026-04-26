import PageContainer from '@/components/shared/PageContainer';
import SectionHeader from '@/components/shared/SectionHeader';
import Card from '@/components/ui/Card';
import Reveal from '@/components/shared/Reveal';
import { accessModel } from '@/data/academyData';

export default function AccessModelSection() {
  return (
    <section className="section-shell">
      <PageContainer>
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeader
            badge="Access Model"
            title="Designed around secure access, subscription delivery, and a protected learning environment."
            description="The academy architecture aligns directly with the ICAD dashboard and activity portal, with intentionally protected content access."
            className="mb-0"
          />
          <div className="grid gap-4">
            {accessModel.map((item, index) => (
              <Reveal key={item} delay={index * 0.05}>
                <Card className="p-5">
                  <p className="text-sm leading-7 text-slate-200">{item}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
