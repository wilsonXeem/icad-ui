import PageContainer from '@/components/shared/PageContainer';
import SectionHeader from '@/components/shared/SectionHeader';
import Card from '@/components/ui/Card';
import Reveal from '@/components/shared/Reveal';
import { industriesServed } from '@/data/servicesData';

export default function IndustriesSection() {
  return (
    <section className="section-shell">
      <PageContainer>
        <SectionHeader
          badge="Industries Served"
          title="Built for high-value scientific environments that depend on rigorous interpretation."
          description="ICAD supports multiple sectors where computational insight shapes discovery, decision-making, and translational value."
        />
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {industriesServed.map((industry, index) => (
            <Reveal key={industry} delay={index * 0.04}>
              <Card className="h-full">
                <p className="text-lg leading-8 text-white">{industry}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </PageContainer>
    </section>
  );
}
