import PageContainer from '@/components/shared/PageContainer';
import SectionHeader from '@/components/shared/SectionHeader';
import Card from '@/components/ui/Card';
import Reveal from '@/components/shared/Reveal';
import { missionContent } from '@/data/aboutData';

export default function VisionMissionSection() {
  return (
    <section className="section-shell">
      <PageContainer>
        <SectionHeader
          badge="Vision & Mission"
          title="A scientific organization building credibility through vision, mission, and translational intent."
          description="ICAD’s institutional direction is grounded in intelligent discovery, computational rigor, and a long-term commitment to globally competitive scientific capability."
        />
        <div className="grid gap-6 md:grid-cols-2">
          <Reveal>
            <Card>
              <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Vision</p>
              <p className="mt-4 text-base leading-8 text-slate-200">{missionContent.vision}</p>
            </Card>
          </Reveal>
          <Reveal delay={0.08}>
            <Card>
              <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Mission</p>
              <p className="mt-4 text-base leading-8 text-slate-200">{missionContent.mission}</p>
            </Card>
          </Reveal>
        </div>
      </PageContainer>
    </section>
  );
}
