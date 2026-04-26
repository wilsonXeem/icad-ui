import Card from '@/components/ui/Card';
import EmptyState from '@/components/ui/EmptyState';

export default function ModuleNavigationPanel({ modules, courseTitle }) {
  if (!modules?.length) {
    return (
      <EmptyState
        title="Module navigation will appear here"
        description="Once course modules are available for your active enrollment, they will surface in this dashboard panel."
      />
    );
  }

  return (
    <Card>
      <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Module Navigation</p>
      <h3 className="mt-3 font-heading text-2xl font-semibold text-white">{courseTitle}</h3>
      <div className="mt-6 grid gap-3">
        {modules.map((module) => (
          <div key={module._id} className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3">
            <p className="text-sm font-semibold text-white">
              {typeof module.position === 'number' ? `${module.position + 1}. ` : ''}
              {module.title}
            </p>
            {module.description ? <p className="mt-2 text-sm leading-7 text-slate-300">{module.description}</p> : null}
          </div>
        ))}
      </div>
    </Card>
  );
}
