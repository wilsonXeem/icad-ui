import { BrainCircuit, GraduationCap, Orbit, Sparkles } from 'lucide-react';
import PageContainer from '@/components/shared/PageContainer';
import SectionHeader from '@/components/shared/SectionHeader';
import FeatureCard from '@/components/ui/FeatureCard';
import Reveal from '@/components/shared/Reveal';
import { homeServices } from '@/data/homeData';

const icons = [Sparkles, Orbit, BrainCircuit, GraduationCap];

export default function WhatWeDoSection() {
  return (
    <section className="section-shell">
      <PageContainer>
        <SectionHeader
          badge="What We Do"
          title="An integrated scientific capability spanning discovery, modelling, and capacity building."
          description="ICAD combines research delivery and academy infrastructure so computational science can move from theory to execution."
        />
        <div className="grid gap-6 md:grid-cols-2">
          {homeServices.map((service, index) => (
            <Reveal key={service.title} delay={index * 0.05}>
              <FeatureCard
                icon={icons[index]}
                title={service.title}
                description={service.description}
                eyebrow="ICAD Capability"
              />
            </Reveal>
          ))}
        </div>
      </PageContainer>
    </section>
  );
}
