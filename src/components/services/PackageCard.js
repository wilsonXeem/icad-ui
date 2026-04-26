import Card from '@/components/ui/Card';

export default function PackageCard({ item, featured = false }) {
  return (
    <Card className={`${featured ? 'border-accent/30 bg-accent/[0.07]' : ''} h-full`}>
      <p className="text-xs uppercase tracking-[0.28em] text-slate-400">{item.audience}</p>
      <h3 className="mt-4 font-heading text-2xl font-semibold text-white">{item.title}</h3>
      <p className="mt-4 text-sm leading-7 text-slate-300">{item.description}</p>
      <div className="mt-6 space-y-3">
        {item.highlights.map((highlight) => (
          <div key={highlight} className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-slate-200">
            {highlight}
          </div>
        ))}
      </div>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-4">
          <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Publication readiness</p>
          <p className="mt-2 text-sm text-slate-200">{item.publicationReadiness}</p>
        </div>
        <div className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-4">
          <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Timeline</p>
          <p className="mt-2 text-sm text-slate-200">{item.timeline}</p>
        </div>
        <div className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-4">
          <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Deliverables</p>
          <p className="mt-2 text-sm text-slate-200">{item.deliverablesQuality}</p>
        </div>
        <div className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-4">
          <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Revision support</p>
          <p className="mt-2 text-sm text-slate-200">{item.revisionSupport}</p>
        </div>
      </div>
      <div className="mt-4 rounded-2xl border border-accentWarm/20 bg-accentWarm/10 px-4 py-4">
        <p className="text-xs uppercase tracking-[0.22em] text-accentWarm">Engagement fee</p>
        <p className="mt-2 text-sm text-slate-100">{item.engagementFee}</p>
      </div>
    </Card>
  );
}
