import PageHero from '@/components/shared/PageHero';

export default function ResearchHero() {
  return (
    <PageHero
      badge="Research"
      title="Advancing scientific knowledge through computational research and collaborative innovation."
      description="The ICAD research layer is positioned to present published papers, ongoing projects, technical reports, and whitepapers within a serious institutional frame."
      primaryAction={{ label: 'Contact the Research Team', href: '/contact' }}
      secondaryAction={{ label: 'Request Research Service', href: '/services#request-quote' }}
      aside={
        <div className="space-y-4">
          <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Research Positioning</p>
          <p className="font-heading text-2xl font-semibold text-white">
            Research outputs should reflect both methodological rigor and reproducible computational workflow design.
          </p>
          <p className="text-sm leading-7 text-slate-300">
            This page is intentionally structured like a serious research institution surface rather than a light
            marketing section.
          </p>
        </div>
      }
    />
  );
}
