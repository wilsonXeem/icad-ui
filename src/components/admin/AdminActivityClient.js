'use client';

import { useEffect, useState } from 'react';
import AdminShell from './AdminShell';
import Card from '@/components/ui/Card';
import Loader from '@/components/ui/Loader';
import EmptyState from '@/components/ui/EmptyState';
import SecondaryButton from '@/components/ui/SecondaryButton';
import SelectInput from '@/components/ui/SelectInput';
import TextArea from '@/components/ui/TextArea';
import { activityStatusOptions } from '@/data/adminData';
import { getActivitySubmissions, updateActivityFeedback, updateActivityStatus } from '@/lib/activityPortal';
import { getApiErrorMessage } from '@/lib/api';

export default function AdminActivityClient() {
  const [submissions, setSubmissions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [draftStatuses, setDraftStatuses] = useState({});
  const [draftFeedback, setDraftFeedback] = useState({});
  const [statusMessage, setStatusMessage] = useState('');

  const loadSubmissions = async () => {
    try {
      const response = await getActivitySubmissions({ limit: 100 });
      const nextSubmissions = response.data || [];
      setSubmissions(nextSubmissions);
      setDraftStatuses(
        nextSubmissions.reduce((acc, item) => {
          acc[item._id] = item.status;
          return acc;
        }, {}),
      );
      setDraftFeedback(
        nextSubmissions.reduce((acc, item) => {
          acc[item._id] = item.feedback || '';
          return acc;
        }, {}),
      );
    } catch (error) {
      setStatusMessage(getApiErrorMessage(error, 'Unable to load activity submissions.'));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadSubmissions();
  }, []);

  const handleReviewSave = async (submissionId) => {
    try {
      if (draftFeedback[submissionId]?.trim()) {
        await updateActivityFeedback(submissionId, draftFeedback[submissionId].trim());
      }
      const response = await updateActivityStatus(submissionId, draftStatuses[submissionId]);
      setStatusMessage(response.message || 'Submission review updated successfully.');
      await loadSubmissions();
    } catch (error) {
      setStatusMessage(getApiErrorMessage(error, 'Unable to update submission review.'));
    }
  };

  return (
    <AdminShell
      title="Activity submission review workflow."
      description="Review learner submissions, leave feedback, and update approval or revision status from a single instructor/admin workspace."
      allowedRoles={['admin', 'instructor']}
    >
      {isLoading ? (
        <div className="flex min-h-[30vh] items-center justify-center">
          <Loader label="Loading activity review workspace..." />
        </div>
      ) : submissions.length ? (
        <div className="grid gap-5">
          {statusMessage ? <p className="text-sm text-slate-300">{statusMessage}</p> : null}
          {submissions.map((submission) => (
            <Card key={submission._id}>
              <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-400">
                    {submission.user?.fullName || 'Unknown user'} • {submission.course?.title || 'General workspace'}
                  </p>
                  <h2 className="mt-3 font-heading text-2xl font-semibold text-white">{submission.title}</h2>
                  {submission.module?.title ? (
                    <p className="mt-2 text-sm text-slate-400">Module: {submission.module.title}</p>
                  ) : null}
                  <p className="mt-4 text-sm leading-8 text-slate-300">
                    {submission.content || 'No written submission content provided.'}
                  </p>
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
                </div>
                <div className="grid gap-4">
                  <SelectInput
                    label="Status"
                    name={`status-${submission._id}`}
                    value={draftStatuses[submission._id] || submission.status}
                    onChange={(event) =>
                      setDraftStatuses((current) => ({
                        ...current,
                        [submission._id]: event.target.value,
                      }))
                    }
                    options={activityStatusOptions}
                  />
                  <TextArea
                    label="Feedback"
                    name={`feedback-${submission._id}`}
                    rows={5}
                    value={draftFeedback[submission._id] || ''}
                    onChange={(event) =>
                      setDraftFeedback((current) => ({
                        ...current,
                        [submission._id]: event.target.value,
                      }))
                    }
                  />
                  <SecondaryButton onClick={() => handleReviewSave(submission._id)}>Save review</SecondaryButton>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <EmptyState
          title="No activity submissions"
          description="Learner submissions will appear here when users begin using the protected activity portal."
          action={<SecondaryButton href="/activity-portal">Open activity portal</SecondaryButton>}
        />
      )}
    </AdminShell>
  );
}
