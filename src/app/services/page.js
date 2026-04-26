import ServicesHero from '@/components/services/ServicesHero';
import PipelineSection from '@/components/services/PipelineSection';
import PackagesSection from '@/components/services/PackagesSection';
import CoreServicesSection from '@/components/services/CoreServicesSection';
import IndustriesSection from '@/components/services/IndustriesSection';
import ServicesCTASection from '@/components/services/ServicesCTASection';

export const metadata = {
  title: 'Services',
  description: 'Premium computational discovery services for research teams and scientific organizations.',
};

export default function ServicesPage() {
  return (
    <>
      <ServicesHero />
      <PipelineSection />
      <PackagesSection />
      <CoreServicesSection />
      <IndustriesSection />
      <ServicesCTASection />
    </>
  );
}
