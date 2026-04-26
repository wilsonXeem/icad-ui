import Card from '@/components/ui/Card';
import EmptyState from '@/components/ui/EmptyState';
import FeedbackCard from './FeedbackCard';

export default function SubmissionList({ submissions }) {
  if (!submissions?.length) {
    return (
      <EmptyState
        title="No submissions yet"
        description="Your activity submissions will appear here with review status, feedback, and future collaboration signals."
      />
    );
  }

  return (
    <div className="grid gap-5">
      {submissions.map((submission) => (
        <div key={submission._id} className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <Card>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-slate-400">
                  {submission.course?.title || 'General workspace'}
                </p>
                <h3 className="mt-3 font-heading text-xl font-semibold text-white">{submission.title}</h3>
              </div>
              <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs uppercase tracking-[0.22em] text-slate-300">
                {submission.status}
              </span>
            </div>
            <p className="mt-4 text-sm leading-7 text-slate-300">{submission.content || 'No written content submitted.'}</p>
            {submission.fileUrl ? (
              <a
                href={submission.fileUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex text-sm text-accent hover:text-white"
              >
                Open attached file
              </a>
            ) : null}
          </Card>
          <FeedbackCard feedback={submission.feedback} status={submission.status} />
        </div>
      ))}
    </div>
  );
}
