import AcademyHero from '@/components/academy/AcademyHero';
import LearningExperienceSection from '@/components/academy/LearningExperienceSection';
import AccessModelSection from '@/components/academy/AccessModelSection';
import TargetAudienceSection from '@/components/academy/TargetAudienceSection';
import CTASection from '@/components/shared/CTASection';

export const metadata = {
  title: 'Academy',
  description: 'Protected academy and course environment for computational discovery training.',
};

export default function AcademyPage() {
  return (
    <>
      <AcademyHero />
      <LearningExperienceSection />
      <AccessModelSection />
      <TargetAudienceSection />
      <CTASection
        badge="Learning Journey"
        title="Position your learning within a serious computational discovery ecosystem."
        description="ICAD Academy is structured to grow from modern coursework into a fuller protected scientific learning platform."
        primaryAction={{ label: 'Go to Login', href: '/login' }}
        secondaryAction={{ label: 'Contact the Academy Team', href: '/contact' }}
      />
    </>
  );
}
