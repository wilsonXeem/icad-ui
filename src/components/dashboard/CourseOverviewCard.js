import Card from '@/components/ui/Card';

export default function CourseOverviewCard({ enrollment }) {
  const course = enrollment.course || {};

  return (
    <Card className="h-full">
      <p className="text-xs uppercase tracking-[0.24em] text-slate-400">{course.category || 'Academy Course'}</p>
      <h3 className="mt-3 font-heading text-xl font-semibold text-white">{course.title}</h3>
      <p className="mt-4 text-sm text-slate-400">{course.level || 'Open level'}</p>
      <div className="mt-6 h-2 rounded-full bg-white/8">
        <div
          className="h-2 rounded-full bg-gradient-to-r from-accent to-accentWarm"
          style={{ width: `${Math.max(enrollment.progress || 0, 8)}%` }}
        />
      </div>
      <p className="mt-3 text-sm text-slate-300">{enrollment.progress || 0}% complete</p>
    </Card>
  );
}
