'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import PageContainer from '@/components/shared/PageContainer';
import SectionHeader from '@/components/shared/SectionHeader';
import FormInput from '@/components/ui/FormInput';
import TextArea from '@/components/ui/TextArea';
import PrimaryButton from '@/components/ui/PrimaryButton';
import Card from '@/components/ui/Card';
import { submitServiceRequest } from '@/lib/serviceRequests';
import { getApiErrorMessage } from '@/lib/api';

const requestQuoteSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  email: z.string().email('Enter a valid email'),
  organization: z.string().optional(),
  projectTitle: z.string().min(3, 'Project title is required'),
  serviceCategory: z.string().min(2, 'Service category is required'),
  projectDescription: z.string().min(20, 'Provide more project detail'),
  timeline: z.string().optional(),
  budgetRange: z.string().optional(),
});

export default function ServicesCTASection() {
  const [status, setStatus] = useState({ type: '', message: '' });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(requestQuoteSchema),
    defaultValues: {
      fullName: '',
      email: '',
      organization: '',
      projectTitle: '',
      serviceCategory: '',
      projectDescription: '',
      timeline: '',
      budgetRange: '',
    },
  });

  const onSubmit = async (values) => {
    setStatus({ type: '', message: '' });

    try {
      const response = await submitServiceRequest(values);
      setStatus({
        type: 'success',
        message: response.message || 'Your service request has been submitted.',
      });
      reset();
    } catch (error) {
      setStatus({
        type: 'error',
        message: getApiErrorMessage(error, 'Unable to submit your request right now.'),
      });
    }
  };

  return (
    <section id="request-quote" className="section-shell">
      <PageContainer>
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionHeader
              badge="Request a Custom Quote"
              title="Tailored computational support for your research needs."
              description="Use the form to describe your project scope, timelines, and service needs. ICAD workflows are structured for exploratory studies, mechanistic analysis, and publication-aligned discovery programs."
              className="mb-6"
            />
            <Card>
              <p className="text-sm leading-8 text-slate-300">
                Strong requests usually include the discovery objective, target context, computational questions,
                desired outputs, and timeline or budget constraints that should shape the work plan. All tiers are
                built on reproducible computational protocols.
              </p>
            </Card>
          </div>

          <Card className="p-6 sm:p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="grid gap-5">
              <div className="grid gap-5 md:grid-cols-2">
                <FormInput label="Full name" name="fullName" register={register} error={errors.fullName} />
                <FormInput label="Email" name="email" type="email" register={register} error={errors.email} />
              </div>
              <div className="grid gap-5 md:grid-cols-2">
                <FormInput
                  label="Organization"
                  name="organization"
                  register={register}
                  error={errors.organization}
                />
                <FormInput
                  label="Service category"
                  name="serviceCategory"
                  register={register}
                  error={errors.serviceCategory}
                />
              </div>
              <FormInput
                label="Project title"
                name="projectTitle"
                register={register}
                error={errors.projectTitle}
              />
              <TextArea
                label="Project description"
                name="projectDescription"
                register={register}
                error={errors.projectDescription}
                rows={6}
              />
              <div className="grid gap-5 md:grid-cols-2">
                <FormInput label="Timeline" name="timeline" register={register} error={errors.timeline} />
                <FormInput label="Budget range" name="budgetRange" register={register} error={errors.budgetRange} />
              </div>
              {status.message ? (
                <p className={`text-sm ${status.type === 'success' ? 'text-emerald-300' : 'text-rose-300'}`}>
                  {status.message}
                </p>
              ) : null}
              <PrimaryButton type="submit" disabled={isSubmitting} className="w-full sm:w-fit">
                {isSubmitting ? 'Submitting request...' : 'Request quote'}
              </PrimaryButton>
            </form>
          </Card>
        </div>
      </PageContainer>
    </section>
  );
}
