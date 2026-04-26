import Card from '@/components/ui/Card';

export default function DashboardHero({ user, metrics }) {
  return (
    <Card className="overflow-hidden">
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-accent">Protected Dashboard</p>
          <h1 className="mt-4 font-heading text-3xl font-semibold text-white sm:text-4xl">
            Welcome to your ICAD learning environment{user?.fullName ? `, ${user.fullName}` : ''}.
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-8 text-slate-300">
            This workspace surfaces enrolled courses, progress tracking, module navigation, assessments, tasks, and
            activity portal access from one protected environment.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-5">
            <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Enrolled Courses</p>
            <p className="mt-3 font-heading text-3xl font-semibold text-white">
              {metrics?.enrolledCoursesCount ?? 0}
            </p>
          </div>
          <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-5">
            <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Recent Submissions</p>
            <p className="mt-3 font-heading text-3xl font-semibold text-white">
              {metrics?.recentActivitySubmissionsCount ?? 0}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}
