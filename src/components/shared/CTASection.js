import PageContainer from './PageContainer';
import SectionHeader from './SectionHeader';
import PrimaryButton from '@/components/ui/PrimaryButton';
import SecondaryButton from '@/components/ui/SecondaryButton';

export default function CTASection({
  badge = 'Next Step',
  title,
  description,
  primaryAction,
  secondaryAction,
}) {
  return (
    <section className="section-shell">
      <PageContainer>
        <div className="panel overflow-hidden p-8 sm:p-12">
          <SectionHeader badge={badge} title={title} description={description} className="mb-8" />
          <div className="flex flex-wrap gap-4">
            {primaryAction ? <PrimaryButton href={primaryAction.href}>{primaryAction.label}</PrimaryButton> : null}
            {secondaryAction ? (
              <SecondaryButton href={secondaryAction.href}>{secondaryAction.label}</SecondaryButton>
            ) : null}
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
