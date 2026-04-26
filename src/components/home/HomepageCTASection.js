import CTASection from '@/components/shared/CTASection';

export default function HomepageCTASection() {
  return (
    <CTASection
      badge="Start With ICAD"
      title="Start your journey with ICAD today, whether as a researcher, student, or industry partner."
      description="Move from exploration to execution with research services, academy access, and a protected scientific workspace designed for serious growth."
      primaryAction={{ label: 'Request Research Service', href: '/services#request-quote' }}
      secondaryAction={{ label: 'Explore the Academy', href: '/academy' }}
    />
  );
}
