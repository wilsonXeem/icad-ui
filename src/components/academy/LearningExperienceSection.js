import { BookOpen, Lock, Microscope, Workflow } from 'lucide-react';
import PageContainer from '@/components/shared/PageContainer';
import SectionHeader from '@/components/shared/SectionHeader';
import FeatureCard from '@/components/ui/FeatureCard';
import Reveal from '@/components/shared/Reveal';
import { learningExperience } from '@/data/academyData';

const icons = [BookOpen, Lock, Workflow, Microscope];

export default function LearningExperienceSection() {
  return (
    <section id="learning-experience" className="section-shell">
      <PageContainer>
        <SectionHeader
          badge="Learning Experience"
          title="Structured, expert-led, and designed around practical computational workflows."
          description="ICAD Academy is positioned as high-impact scientific training with real-world project integration and a protected delivery model."
        />
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {learningExperience.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.05}>
              <FeatureCard icon={icons[index]} title={item.title} description={item.description} />
            </Reveal>
          ))}
        </div>
      </PageContainer>
    </section>
  );
}
