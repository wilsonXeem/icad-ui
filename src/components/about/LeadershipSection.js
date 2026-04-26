import PageContainer from '@/components/shared/PageContainer';
import SectionHeader from '@/components/shared/SectionHeader';
import Card from '@/components/ui/Card';
import Reveal from '@/components/shared/Reveal';
import { leadershipTeam } from '@/data/aboutData';

export default function LeadershipSection() {
  return (
    <section className="section-shell">
      <PageContainer>
        <SectionHeader
          badge="Leadership"
          title="Institutional leadership shaped around scientific direction and operational strategy."
          description="ICAD’s leadership combines vision for computational discovery with the structure required for scalable execution."
        />
        <div className="grid gap-6 md:grid-cols-2">
          {leadershipTeam.map((leader, index) => (
            <Reveal key={leader.name} delay={index * 0.06}>
              <Card>
                <p className="text-xs uppercase tracking-[0.28em] text-accentWarm">{leader.role}</p>
                <h3 className="mt-4 font-heading text-2xl font-semibold text-white">{leader.name}</h3>
                {leader.descriptor ? <p className="mt-3 text-sm text-slate-400">{leader.descriptor}</p> : null}
                <p className="mt-4 text-sm leading-7 text-slate-300">{leader.bio}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </PageContainer>
    </section>
  );
}
