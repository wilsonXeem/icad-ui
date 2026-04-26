import Card from './Card';

export default function FeatureCard({ icon: Icon, title, description, eyebrow, className = '' }) {
  return (
    <Card className={`h-full ${className}`}>
      <div className="mb-4 flex items-center gap-3">
        {Icon ? (
          <div className="rounded-2xl border border-accent/25 bg-accent/10 p-3 text-accent">
            <Icon className="h-5 w-5" />
          </div>
        ) : null}
        {eyebrow ? <p className="text-xs uppercase tracking-[0.24em] text-slate-400">{eyebrow}</p> : null}
      </div>
      <h3 className="font-heading text-xl font-semibold text-white">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-slate-300">{description}</p>
    </Card>
  );
}
