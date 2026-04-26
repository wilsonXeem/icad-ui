import HeroSection from '@/components/home/HeroSection';
import WhoWeAreSection from '@/components/home/WhoWeAreSection';
import WhatWeDoSection from '@/components/home/WhatWeDoSection';
import WhyICADSection from '@/components/home/WhyICADSection';
import HomepageCTASection from '@/components/home/HomepageCTASection';
import StatsStrip from '@/components/shared/StatsStrip';

const statItems = [
  {
    label: 'Publication-grade workflows',
    description: 'Scientific outputs designed for credible interpretation and high-trust delivery.',
  },
  {
    label: 'AI + chemistry integration',
    description: 'Integrated machine learning, modelling, and chemical reasoning across the same platform.',
  },
  {
    label: 'Training + research ecosystem',
    description: 'A connected environment for services, learning, and future scientific collaboration.',
  },
];

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsStrip items={statItems} />
      <WhoWeAreSection />
      <WhatWeDoSection />
      <WhyICADSection />
      <HomepageCTASection />
    </>
  );
}
