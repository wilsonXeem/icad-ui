import Card from '@/components/ui/Card';

export default function ResearchTasksPanel({ items }) {
  return (
    <Card>
      <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Research Task Tracking</p>
      <div className="mt-5 grid gap-4">
        {items.map((item) => (
          <div key={item.title} className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-4">
            <h3 className="font-heading text-lg font-semibold text-white">{item.title}</h3>
            <p className="mt-2 text-sm leading-7 text-slate-300">{item.description}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}
