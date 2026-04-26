'use client';

import { useEffect, useState } from 'react';
import AdminShell from './AdminShell';
import Card from '@/components/ui/Card';
import Loader from '@/components/ui/Loader';
import EmptyState from '@/components/ui/EmptyState';
import SecondaryButton from '@/components/ui/SecondaryButton';
import SelectInput from '@/components/ui/SelectInput';
import { contactStatusOptions } from '@/data/adminData';
import { getContactInquiries, updateContactInquiryStatus } from '@/lib/contact';
import { getApiErrorMessage } from '@/lib/api';

export default function AdminInquiriesClient() {
  const [inquiries, setInquiries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [draftStatuses, setDraftStatuses] = useState({});
  const [statusMessage, setStatusMessage] = useState('');

  const loadInquiries = async () => {
    try {
      const response = await getContactInquiries({ limit: 100 });
      const nextInquiries = response.data || [];
      setInquiries(nextInquiries);
      setDraftStatuses(
        nextInquiries.reduce((acc, item) => {
          acc[item._id] = item.status;
          return acc;
        }, {}),
      );
    } catch (error) {
      setStatusMessage(getApiErrorMessage(error, 'Unable to load contact inquiries.'));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadInquiries();
  }, []);

  const handleStatusSave = async (inquiryId) => {
    try {
      const response = await updateContactInquiryStatus(inquiryId, draftStatuses[inquiryId]);
      setStatusMessage(response.message || 'Inquiry status updated successfully.');
      await loadInquiries();
    } catch (error) {
      setStatusMessage(getApiErrorMessage(error, 'Unable to update inquiry status.'));
    }
  };

  return (
    <AdminShell
      title="Public contact inquiry workflow."
      description="Review incoming site inquiries, update their status, and keep the public contact pipeline moving."
      allowedRoles={['admin']}
      unauthorizedTitle="Admin-only workflow"
      unauthorizedDescription="Only admin accounts can manage public contact inquiries."
    >
      {isLoading ? (
        <div className="flex min-h-[30vh] items-center justify-center">
          <Loader label="Loading contact inquiries..." />
        </div>
      ) : inquiries.length ? (
        <div className="grid gap-5">
          {statusMessage ? <p className="text-sm text-slate-300">{statusMessage}</p> : null}
          {inquiries.map((inquiry) => (
            <Card key={inquiry._id}>
              <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
                <div className="max-w-3xl">
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-400">{inquiry.inquiryType}</p>
                  <h2 className="mt-3 font-heading text-2xl font-semibold text-white">{inquiry.name}</h2>
                  <p className="mt-2 text-sm text-slate-400">{inquiry.email}</p>
                  <p className="mt-4 text-sm leading-8 text-slate-300">{inquiry.message}</p>
                </div>
                <div className="grid min-w-[260px] gap-4">
                  <SelectInput
                    label="Status"
                    name={`status-${inquiry._id}`}
                    value={draftStatuses[inquiry._id] || inquiry.status}
                    onChange={(event) =>
                      setDraftStatuses((current) => ({
                        ...current,
                        [inquiry._id]: event.target.value,
                      }))
                    }
                    options={contactStatusOptions}
                  />
                  <SecondaryButton onClick={() => handleStatusSave(inquiry._id)}>Save status</SecondaryButton>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <EmptyState
          title="No contact inquiries"
          description="Incoming public inquiries will appear here once site visitors submit the contact form."
          action={<SecondaryButton href="/contact">Open contact page</SecondaryButton>}
        />
      )}
    </AdminShell>
  );
}
