import Card from '@/components/ui/Card';

export default function FeedbackCard({ feedback, status }) {
  return (
    <Card className="p-5">
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Instructor Feedback</p>
        {status ? (
          <span className="rounded-full border border-accent/20 bg-accent/10 px-3 py-1 text-xs uppercase tracking-[0.22em] text-accent">
            {status}
          </span>
        ) : null}
      </div>
      <p className="mt-4 text-sm leading-7 text-slate-300">{feedback || 'Feedback has not been added yet.'}</p>
    </Card>
  );
}
