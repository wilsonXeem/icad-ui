'use client';

import { useEffect, useState } from 'react';
import PageContainer from '@/components/shared/PageContainer';
import ProtectedRoute from '@/components/shared/ProtectedRoute';
import Loader from '@/components/ui/Loader';
import EmptyState from '@/components/ui/EmptyState';
import SecondaryButton from '@/components/ui/SecondaryButton';
import DashboardHero from './DashboardHero';
import CourseOverviewCard from './CourseOverviewCard';
import ProgressCard from './ProgressCard';
import TaskCard from './TaskCard';
import PortalAccessCard from './PortalAccessCard';
import ModuleNavigationPanel from './ModuleNavigationPanel';
import { getDashboardSummary } from '@/lib/dashboard';
import { getCourseModules } from '@/lib/courses';
import { dashboardExperience, dashboardTaskPlaceholders } from '@/data/dashboardData';
import useAuth from '@/hooks/useAuth';

export default function DashboardClient() {
  const { user } = useAuth();
  const [summary, setSummary] = useState(null);
  const [modules, setModules] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const response = await getDashboardSummary();
        const dashboardData = response.data;
        setSummary(dashboardData);

        const activeEnrollment = dashboardData?.recentEnrollments?.[0];

        if (activeEnrollment?.course?._id) {
          try {
            const modulesResponse = await getCourseModules(activeEnrollment.course._id);
            setModules(modulesResponse.data || []);
          } catch (error) {
            setModules([]);
          }
        }
      } catch (error) {
        setSummary(null);
      } finally {
        setIsLoading(false);
      }
    };

    loadDashboard();
  }, []);

  return (
    <ProtectedRoute>
      <section className="section-shell pt-28">
        <PageContainer>
          {isLoading ? (
            <div className="flex min-h-[50vh] items-center justify-center">
              <Loader label="Loading dashboard..." />
            </div>
          ) : !summary ? (
            <EmptyState
              title="Dashboard unavailable"
              description="We could not load your dashboard summary from the backend at the moment."
              action={<SecondaryButton href="/contact">Contact support</SecondaryButton>}
            />
          ) : (
            <div className="grid gap-8">
              <DashboardHero user={summary.user || user} metrics={summary.metrics} />

              <div className="grid gap-6 lg:grid-cols-3">
                <ProgressCard
                  title="Profile status"
                  value={summary.user?.status || 'active'}
                  helper="Your current account state and protected platform access status."
                />
                <ProgressCard
                  title="Academy access"
                  value={summary.metrics?.enrolledCoursesCount ?? 0}
                  helper="Published and enrolled learning surfaces available in your dashboard."
                />
                <ProgressCard
                  title="Submission flow"
                  value={summary.metrics?.recentActivitySubmissionsCount ?? 0}
                  helper="Recent activity submissions recorded in your protected workspace."
                />
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                {dashboardExperience.map((item) => (
                  <div key={item} className="panel-soft px-5 py-4 text-sm text-slate-200">
                    {item}
                  </div>
                ))}
              </div>

              <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
                <div className="grid gap-6">
                  <div>
                    <p className="mb-4 text-xs uppercase tracking-[0.28em] text-slate-400">Enrolled Courses</p>
                    {summary.recentEnrollments?.length ? (
                      <div className="grid gap-6 md:grid-cols-2">
                        {summary.recentEnrollments.map((enrollment) => (
                          <CourseOverviewCard
                            key={enrollment._id}
                            enrollment={enrollment}
                          />
                        ))}
                      </div>
                    ) : (
                      <EmptyState
                        title="No enrollments yet"
                        description="As course enrollments are created in the backend, they will appear here with progress tracking."
                        action={<SecondaryButton href="/academy">Explore academy</SecondaryButton>}
                      />
                    )}
                  </div>

                  <ModuleNavigationPanel
                    modules={modules}
                    courseTitle={summary.recentEnrollments?.[0]?.course?.title}
                  />
                </div>

                <div className="grid gap-6">
                  <PortalAccessCard />
                  {summary.recentSubmissions?.length
                    ? summary.recentSubmissions.map((submission) => (
                        <TaskCard
                          key={submission._id}
                          title={submission.title}
                          description={submission.feedback || 'Submitted work awaiting further review or instructor notes.'}
                          status={submission.status}
                        />
                      ))
                    : dashboardTaskPlaceholders.map((item) => (
                        <TaskCard key={item.title} title={item.title} description={item.description} />
                      ))}
                </div>
              </div>
            </div>
          )}
        </PageContainer>
      </section>
    </ProtectedRoute>
  );
}
