'use client';

import { useEffect, useState } from 'react';
import Card from '@/components/ui/Card';
import EmptyState from '@/components/ui/EmptyState';
import Loader from '@/components/ui/Loader';
import SecondaryButton from '@/components/ui/SecondaryButton';
import useAuth from '@/hooks/useAuth';
import { getCourses } from '@/lib/courses';
import { getContactInquiries } from '@/lib/contact';
import { getServiceRequests } from '@/lib/serviceRequests';
import { getActivitySubmissions } from '@/lib/activityPortal';
import AdminShell from './AdminShell';

const metricCardsForRole = (role, metrics) => {
  const base = [
    {
      label: 'Courses',
      value: metrics.courses,
      description: 'Published and unpublished academy content available for management.',
    },
    {
      label: 'Activity submissions',
      value: metrics.submissions,
      description: 'Learner submissions awaiting review, feedback, or status updates.',
    },
  ];

  if (role === 'admin') {
    base.push(
      {
        label: 'Contact inquiries',
        value: metrics.inquiries,
        description: 'Incoming site inquiries requiring review or routing.',
      },
      {
        label: 'Service requests',
        value: metrics.requests,
        description: 'Research and quote workflows currently moving through the pipeline.',
      },
    );
  }

  return base;
};

export default function AdminOverviewClient() {
  const { user } = useAuth();
  const [metrics, setMetrics] = useState({
    courses: 0,
    inquiries: 0,
    requests: 0,
    submissions: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const loadOverview = async () => {
      try {
        const promises = [
          getCourses({ limit: 100 }),
          getActivitySubmissions({ limit: 100 }),
        ];

        if (user?.role === 'admin') {
          promises.push(getContactInquiries({ limit: 100 }), getServiceRequests({ limit: 100 }));
        }

        const responses = await Promise.all(promises);
        const [coursesResponse, submissionsResponse, inquiriesResponse, requestsResponse] = responses;

        setMetrics({
          courses: coursesResponse.data?.length || 0,
          submissions: submissionsResponse.data?.length || 0,
          inquiries: inquiriesResponse?.data?.length || 0,
          requests: requestsResponse?.data?.length || 0,
        });
        setHasError(false);
      } catch (error) {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    if (user?.role) {
      loadOverview();
    }
  }, [user?.role]);

  return (
    <AdminShell
      title="Operational control for the ICAD platform."
      description="Use this admin area to manage academy content, review incoming site workflows, and handle protected platform operations from one place."
    >
      {isLoading ? (
        <div className="flex min-h-[30vh] items-center justify-center">
          <Loader label="Loading admin overview..." />
        </div>
      ) : hasError ? (
        <EmptyState
          title="Admin overview unavailable"
          description="The platform could not load operational summary data from the backend."
          action={<SecondaryButton href="/dashboard">Return to dashboard</SecondaryButton>}
        />
      ) : (
        <>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {metricCardsForRole(user?.role, metrics).map((item) => (
              <Card key={item.label} className="h-full">
                <p className="text-xs uppercase tracking-[0.24em] text-slate-400">{item.label}</p>
                <p className="mt-4 font-heading text-3xl font-semibold text-white">{item.value}</p>
                <p className="mt-3 text-sm leading-7 text-slate-300">{item.description}</p>
              </Card>
            ))}
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Recommended workflow</p>
              <div className="mt-5 grid gap-3">
                {[
                  'Review and publish academy courses from the Courses section',
                  'Monitor learner submissions and leave feedback in Activity Review',
                  user?.role === 'admin'
                    ? 'Process public inquiries and service requests before they become stale'
                    : 'Coordinate course content and submission review with the admin team',
                ].map((item) => (
                  <div key={item} className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-slate-200">
                    {item}
                  </div>
                ))}
              </div>
            </Card>

            <Card>
              <p className="text-xs uppercase tracking-[0.24em] text-slate-400">MVP scope</p>
              <p className="mt-4 text-sm leading-8 text-slate-300">
                This admin workflow is focused on practical platform operations for the MVP: managing courses,
                responding to incoming site activity, and handling learner submissions without needing a separate
                back-office tool.
              </p>
            </Card>
          </div>
        </>
      )}
    </AdminShell>
  );
}
