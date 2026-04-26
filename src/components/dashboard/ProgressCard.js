import Card from '@/components/ui/Card';

export default function ProgressCard({ title, value, helper }) {
  return (
    <Card className="h-full">
      <p className="text-xs uppercase tracking-[0.24em] text-slate-400">{title}</p>
      <p className="mt-4 font-heading text-3xl font-semibold text-white">{value}</p>
      <p className="mt-3 text-sm leading-7 text-slate-300">{helper}</p>
    </Card>
  );
}
