import Badge from '@/components/ui/Badge';

export default function SectionHeader({ badge, title, description, align = 'left', className = '' }) {
  const alignment = align === 'center' ? 'mx-auto text-center items-center' : 'items-start text-left';

  return (
    <div className={`mb-12 flex max-w-3xl flex-col gap-4 ${alignment} ${className}`}>
      {badge ? <Badge>{badge}</Badge> : null}
      <h2 className="font-heading text-3xl font-semibold tracking-tight text-white sm:text-4xl">{title}</h2>
      {description ? <p className="text-base leading-8 text-slate-300">{description}</p> : null}
    </div>
  );
}
