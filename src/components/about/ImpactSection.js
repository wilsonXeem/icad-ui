import CTASection from '@/components/shared/CTASection';
import { missionContent } from '@/data/aboutData';

export default function ImpactSection() {
  return (
    <CTASection
      badge="Impact Vision"
      title="ICAD is committed to positioning Africa as a producer of scientific innovation, not just a consumer."
      description={missionContent.impact}
      primaryAction={{ label: 'Explore Services', href: '/services' }}
      secondaryAction={{ label: 'Contact ICAD', href: '/contact' }}
    />
  );
}
