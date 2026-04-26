import PageHero from '@/components/shared/PageHero';

export default function AcademyHero() {
  return (
    <PageHero
      badge="ICAD Academy"
      title="Protected scientific learning built for computational discovery."
      description="ICAD Academy is positioned as a structured, premium learning environment for serious learners moving into computer-aided discovery, AI-enabled workflows, and computational chemistry."
      primaryAction={{ label: 'Access Learning Pathways', href: '#learning-experience' }}
      secondaryAction={{ label: 'Open Dashboard', href: '/dashboard' }}
      aside={
        <div className="space-y-4">
          <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Academy Positioning</p>
          <p className="font-heading text-2xl font-semibold text-white">
            A future-ready academy ecosystem, not just a list of static lessons.
          </p>
          <p className="text-sm leading-7 text-slate-300">
            Learners move through protected dashboards, course modules, assignment submissions, and growing
            research-linked workflows.
          </p>
        </div>
      }
    />
  );
}
