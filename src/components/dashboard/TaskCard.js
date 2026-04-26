import Card from '@/components/ui/Card';

export default function TaskCard({ title, description, status }) {
  return (
    <Card className="h-full">
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-heading text-xl font-semibold text-white">{title}</h3>
        {status ? (
          <span className="rounded-full border border-accent/20 bg-accent/10 px-3 py-1 text-xs uppercase tracking-[0.22em] text-accent">
            {status}
          </span>
        ) : null}
      </div>
      <p className="mt-4 text-sm leading-7 text-slate-300">{description}</p>
    </Card>
  );
}
