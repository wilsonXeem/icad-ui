'use client';

import { useEffect, useState } from 'react';
import AdminShell from './AdminShell';
import Card from '@/components/ui/Card';
import Loader from '@/components/ui/Loader';
import EmptyState from '@/components/ui/EmptyState';
import SecondaryButton from '@/components/ui/SecondaryButton';
import SelectInput from '@/components/ui/SelectInput';
import { serviceRequestStatusOptions } from '@/data/adminData';
import { getServiceRequests, updateServiceRequest } from '@/lib/serviceRequests';
import { getApiErrorMessage } from '@/lib/api';

export default function AdminServiceRequestsClient() {
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [draftStatuses, setDraftStatuses] = useState({});
  const [statusMessage, setStatusMessage] = useState('');

  const loadRequests = async () => {
    try {
      const response = await getServiceRequests({ limit: 100 });
      const nextRequests = response.data || [];
      setRequests(nextRequests);
      setDraftStatuses(
        nextRequests.reduce((acc, item) => {
          acc[item._id] = item.status;
          return acc;
        }, {}),
      );
    } catch (error) {
      setStatusMessage(getApiErrorMessage(error, 'Unable to load service requests.'));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadRequests();
  }, []);

  const handleStatusSave = async (requestId) => {
    try {
      const response = await updateServiceRequest(requestId, { status: draftStatuses[requestId] });
      setStatusMessage(response.message || 'Service request updated successfully.');
      await loadRequests();
    } catch (error) {
      setStatusMessage(getApiErrorMessage(error, 'Unable to update service request.'));
    }
  };

  return (
    <AdminShell
      title="Research service request workflow."
      description="Review quote requests, track the pipeline stage, and keep incoming project conversations moving."
      allowedRoles={['admin']}
      unauthorizedTitle="Admin-only workflow"
      unauthorizedDescription="Only admin accounts can manage public service requests."
    >
      {isLoading ? (
        <div className="flex min-h-[30vh] items-center justify-center">
          <Loader label="Loading service requests..." />
        </div>
      ) : requests.length ? (
        <div className="grid gap-5">
          {statusMessage ? <p className="text-sm text-slate-300">{statusMessage}</p> : null}
          {requests.map((request) => (
            <Card key={request._id}>
              <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
                <div className="max-w-3xl">
                  <p className="text-xs uppercase tracking-[0.24em] text-accentWarm">{request.serviceCategory}</p>
                  <h2 className="mt-3 font-heading text-2xl font-semibold text-white">{request.projectTitle}</h2>
                  <p className="mt-2 text-sm text-slate-400">
                    {request.fullName} • {request.email}
                    {request.organization ? ` • ${request.organization}` : ''}
                  </p>
                  <p className="mt-4 text-sm leading-8 text-slate-300">{request.projectDescription}</p>
                  <div className="mt-4 flex flex-wrap gap-4 text-xs uppercase tracking-[0.22em] text-slate-400">
                    {request.timeline ? <span>Timeline: {request.timeline}</span> : null}
                    {request.budgetRange ? <span>Budget: {request.budgetRange}</span> : null}
                  </div>
                </div>
                <div className="grid min-w-[260px] gap-4">
                  <SelectInput
                    label="Status"
                    name={`status-${request._id}`}
                    value={draftStatuses[request._id] || request.status}
                    onChange={(event) =>
                      setDraftStatuses((current) => ({
                        ...current,
                        [request._id]: event.target.value,
                      }))
                    }
                    options={serviceRequestStatusOptions}
                  />
                  <SecondaryButton onClick={() => handleStatusSave(request._id)}>Save status</SecondaryButton>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <EmptyState
          title="No service requests"
          description="Research and quote requests will appear here once the public services form is used."
          action={<SecondaryButton href="/services#request-quote">Open services page</SecondaryButton>}
        />
      )}
    </AdminShell>
  );
}
