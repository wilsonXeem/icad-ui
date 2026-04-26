import Card from '@/components/ui/Card';
import PageContainer from './PageContainer';

export default function StatsStrip({ items }) {
  return (
    <section className="section-shell py-12">
      <PageContainer>
        <div className="grid gap-4 md:grid-cols-3">
          {items.map((item) => (
            <Card key={item.label} className="p-5">
              <p className="text-sm uppercase tracking-[0.22em] text-slate-400">{item.label}</p>
              <p className="mt-3 text-sm leading-7 text-slate-300">{item.description}</p>
            </Card>
          ))}
        </div>
      </PageContainer>
    </section>
  );
}
