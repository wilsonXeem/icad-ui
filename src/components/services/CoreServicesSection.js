import { Cpu, Dna, Eye, FlaskConical, Orbit } from 'lucide-react';
import PageContainer from '@/components/shared/PageContainer';
import SectionHeader from '@/components/shared/SectionHeader';
import Reveal from '@/components/shared/Reveal';
import { coreServices } from '@/data/servicesData';

const iconMap = [Cpu, FlaskConical, Orbit, Dna, Eye];

export default function CoreServicesSection() {
  return (
    <section className="section-shell">
      <PageContainer>
        <SectionHeader
          badge="Core Services"
          title="Focused technical capabilities across modelling, AI, simulation, and interpretation."
          description="The ICAD service catalogue is broad, but each capability is positioned as part of a coherent scientific delivery model."
        />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {coreServices.map((service, index) => {
            const Icon = iconMap[index % iconMap.length];

            return (
              <Reveal key={service} delay={index * 0.03}>
                <div className="panel-soft flex h-full items-center gap-4 p-5">
                  <div className="rounded-2xl border border-accent/20 bg-accent/10 p-3 text-accent">
                    <Icon className="h-4 w-4" />
                  </div>
                  <p className="text-sm leading-7 text-slate-200">{service}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </PageContainer>
    </section>
  );
}
