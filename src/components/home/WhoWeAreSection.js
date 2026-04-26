import PageContainer from '@/components/shared/PageContainer';
import SectionHeader from '@/components/shared/SectionHeader';
import Reveal from '@/components/shared/Reveal';
import Card from '@/components/ui/Card';
import { homeThemes, whoWeAreContent } from '@/data/homeData';

export default function WhoWeAreSection() {
  return (
    <section className="section-shell">
      <PageContainer>
        <SectionHeader
          badge="Who We Are"
          title="A forward-thinking scientific organization dedicated to transforming the way discoveries are made."
          description={whoWeAreContent.intro}
        />
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
          <Reveal>
            <Card>
              <p className="text-sm leading-8 text-slate-300">
                {whoWeAreContent.body}
              </p>
            </Card>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="grid gap-4">
              {homeThemes.map((theme) => (
                <div key={theme} className="panel-soft px-5 py-4 text-sm font-medium text-white">
                  {theme}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </PageContainer>
    </section>
  );
}
