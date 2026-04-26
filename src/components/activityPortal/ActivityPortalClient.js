'use client';

import { useEffect, useState } from 'react';
import PageContainer from '@/components/shared/PageContainer';
import ProtectedRoute from '@/components/shared/ProtectedRoute';
import Loader from '@/components/ui/Loader';
import EmptyState from '@/components/ui/EmptyState';
import SecondaryButton from '@/components/ui/SecondaryButton';
import Card from '@/components/ui/Card';
import { getMyActivitySubmissions } from '@/lib/activityPortal';
import { researchTaskPlaceholders } from '@/data/dashboardData';
import SubmissionForm from './SubmissionForm';
import SubmissionList from './SubmissionList';
import ResearchTasksPanel from './ResearchTasksPanel';

export default function ActivityPortalClient() {
  const [submissions, setSubmissions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const loadSubmissions = async () => {
    try {
      const response = await getMyActivitySubmissions({ limit: 10 });
      setSubmissions(response.data || []);
      setHasError(false);
    } catch (error) {
      setHasError(true);
      setSubmissions([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadSubmissions();
  }, []);

  return (
    <ProtectedRoute>
      <section className="section-shell pt-28">
        <PageContainer>
          <div className="grid gap-8">
            <Card>
              <p className="text-xs uppercase tracking-[0.28em] text-accent">Activity Portal</p>
              <h1 className="mt-4 font-heading text-3xl font-semibold text-white sm:text-4xl">
                A collaborative environment for applied learning and research engagement.
              </h1>
              <p className="mt-4 max-w-3xl text-sm leading-8 text-slate-300">
                This protected portal supports assignment submission, instructor feedback, research task tracking,
                discussion-oriented expansion, and future collaboration pathways for subscribers.
              </p>
            </Card>

            <div className="grid gap-6 xl:grid-cols-[1fr_1fr]">
              <SubmissionForm onSubmitted={loadSubmissions} />
              <ResearchTasksPanel items={researchTaskPlaceholders} />
            </div>

            <div className="grid gap-4">
              <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Submission History</p>
              {isLoading ? (
                <div className="flex min-h-[30vh] items-center justify-center">
                  <Loader label="Loading activity submissions..." />
                </div>
              ) : hasError ? (
                <EmptyState
                  title="Unable to load submissions"
                  description="The activity portal could not retrieve your submissions from the backend."
                  action={<SecondaryButton onClick={loadSubmissions}>Retry</SecondaryButton>}
                />
              ) : (
                <SubmissionList submissions={submissions} />
              )}
            </div>
          </div>
        </PageContainer>
      </section>
    </ProtectedRoute>
  );
}
