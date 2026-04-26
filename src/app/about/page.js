import PageHero from '@/components/shared/PageHero';
import VisionMissionSection from '@/components/about/VisionMissionSection';
import ApproachSection from '@/components/about/ApproachSection';
import LeadershipSection from '@/components/about/LeadershipSection';
import ImpactSection from '@/components/about/ImpactSection';

export const metadata = {
  title: 'About',
  description: 'Vision, mission, leadership, and institutional approach behind ICAD.',
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        badge="About ICAD"
        title="An institutional platform for computational discovery, scientific learning, and innovation."
        description="ICAD is built to translate artificial intelligence, computational chemistry, and disciplined scientific practice into a coherent research ecosystem."
      />
      <VisionMissionSection />
      <ApproachSection />
      <LeadershipSection />
      <ImpactSection />
    </>
  );
}
