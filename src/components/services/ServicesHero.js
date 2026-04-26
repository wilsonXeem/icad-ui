import PageHero from '@/components/shared/PageHero';

export default function ServicesHero() {
  return (
    <PageHero
      badge="Research Services"
      title="Advanced computational research services designed to accelerate discovery pipelines."
      description="ICAD provides advanced computational research services for academia, biotech, and industry, with workflows shaped for mechanistic insight, predictive intelligence, and optimized lead discovery."
      primaryAction={{ label: 'Request a Custom Quote', href: '#request-quote' }}
      secondaryAction={{ label: 'View the Discovery Pipeline', href: '#pipeline' }}
      aside={
        <div className="space-y-4">
          <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Service Positioning</p>
          <p className="font-heading text-2xl font-semibold text-white">
            A structured pathway from screening to mechanistic insight to AI-driven discovery.
          </p>
          <p className="text-sm leading-7 text-slate-300">
            All analyses are performed with reproducible computational protocols suitable for academic publication
            and serious research engagement.
          </p>
        </div>
      }
    />
  );
}
