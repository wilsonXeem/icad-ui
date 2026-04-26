import { Cpu, FlaskConical, Lightbulb } from 'lucide-react';
import PageContainer from '@/components/shared/PageContainer';
import SectionHeader from '@/components/shared/SectionHeader';
import FeatureCard from '@/components/ui/FeatureCard';
import Reveal from '@/components/shared/Reveal';
import { missionContent } from '@/data/aboutData';

const approachCards = [
  {
    icon: FlaskConical,
    title: 'Science',
    description: 'Scientific rigor remains the foundation for how ICAD frames questions, interprets outputs, and positions results.',
  },
  {
    icon: Cpu,
    title: 'Technology',
    description: 'Physics-based simulations and computational infrastructure are used to scale analysis and sharpen insight.',
  },
  {
    icon: Lightbulb,
    title: 'Innovation',
    description: 'Data-driven intelligence is integrated to translate technical work into actionable scientific decisions.',
  },
];

export default function ApproachSection() {
  return (
    <section className="section-shell">
      <PageContainer>
        <SectionHeader
          badge="Approach"
          title="ICAD operates at the intersection of science, technology, and innovation."
          description={missionContent.approach}
        />
        <div className="grid gap-6 md:grid-cols-3">
          {approachCards.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.05}>
              <FeatureCard icon={item.icon} title={item.title} description={item.description} />
            </Reveal>
          ))}
        </div>
      </PageContainer>
    </section>
  );
}
