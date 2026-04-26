import PrimaryButton from '@/components/ui/PrimaryButton';
import SecondaryButton from '@/components/ui/SecondaryButton';
import Badge from '@/components/ui/Badge';
import PageContainer from './PageContainer';

export default function PageHero({ badge, title, description, primaryAction, secondaryAction, aside }) {
  return (
    <section className="section-shell pt-24">
      <PageContainer>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_420px] lg:items-end">
          <div>
            {badge ? <Badge>{badge}</Badge> : null}
            <h1 className="mt-6 font-heading text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
              {title}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">{description}</p>
            {(primaryAction || secondaryAction) && (
              <div className="mt-8 flex flex-wrap gap-4">
                {primaryAction ? <PrimaryButton href={primaryAction.href}>{primaryAction.label}</PrimaryButton> : null}
                {secondaryAction ? (
                  <SecondaryButton href={secondaryAction.href}>{secondaryAction.label}</SecondaryButton>
                ) : null}
              </div>
            )}
          </div>
          {aside ? <div className="panel p-6 sm:p-8">{aside}</div> : null}
        </div>
      </PageContainer>
    </section>
  );
}
