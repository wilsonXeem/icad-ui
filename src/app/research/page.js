import ResearchHero from '@/components/research/ResearchHero';
import PublicationsSection from '@/components/research/PublicationsSection';
import ProjectsSection from '@/components/research/ProjectsSection';
import ReportsSection from '@/components/research/ReportsSection';

export const metadata = {
  title: 'Research',
  description: 'Research-facing surfaces for publications, projects, reports, and workflow credibility.',
};

export default function ResearchPage() {
  return (
    <>
      <ResearchHero />
      <PublicationsSection />
      <ProjectsSection />
      <ReportsSection />
    </>
  );
}
