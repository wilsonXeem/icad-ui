'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import PageContainer from '@/components/shared/PageContainer';
import SectionHeader from '@/components/shared/SectionHeader';
import FormInput from '@/components/ui/FormInput';
import SelectInput from '@/components/ui/SelectInput';
import TextArea from '@/components/ui/TextArea';
import PrimaryButton from '@/components/ui/PrimaryButton';
import Card from '@/components/ui/Card';
import { inquiryOptions, responseCommitment } from '@/data/contactData';
import { submitContactInquiry } from '@/lib/contact';
import { getApiErrorMessage } from '@/lib/api';

const contactSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Enter a valid email'),
  inquiryType: z.string().min(1, 'Select an inquiry type'),
  message: z.string().min(10, 'Please provide more context'),
});

export default function ContactFormSection() {
  const [status, setStatus] = useState({ type: '', message: '' });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      inquiryType: '',
      message: '',
    },
  });

  const onSubmit = async (values) => {
    setStatus({ type: '', message: '' });

    try {
      const response = await submitContactInquiry(values);
      setStatus({
        type: 'success',
        message: response.message || 'Your inquiry has been received.',
      });
      reset();
    } catch (error) {
      setStatus({
        type: 'error',
        message: getApiErrorMessage(error, 'Unable to send your inquiry right now.'),
      });
    }
  };

  return (
    <section className="section-shell">
      <PageContainer>
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <SectionHeader
              badge="Inquiry Form"
              title="Send a direct message to the ICAD team."
              description="We aim to respond with clarity and context, especially for research service inquiries, strategic questions, and platform access requests."
              className="mb-6"
            />
            <Card>
              <p className="text-sm leading-8 text-slate-300">
                Response commitment: {responseCommitment}
              </p>
            </Card>
          </div>
          <Card className="p-6 sm:p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="grid gap-5">
              <div className="grid gap-5 md:grid-cols-2">
                <FormInput label="Name" name="name" register={register} error={errors.name} />
                <FormInput label="Email" name="email" type="email" register={register} error={errors.email} />
              </div>
              <SelectInput
                label="Inquiry type"
                name="inquiryType"
                register={register}
                error={errors.inquiryType}
                options={inquiryOptions}
              />
              <TextArea label="Message" name="message" register={register} error={errors.message} rows={6} />
              {status.message ? (
                <p className={`text-sm ${status.type === 'success' ? 'text-emerald-300' : 'text-rose-300'}`}>
                  {status.message}
                </p>
              ) : null}
              <PrimaryButton type="submit" disabled={isSubmitting} className="w-full sm:w-fit">
                {isSubmitting ? 'Sending inquiry...' : 'Send inquiry'}
              </PrimaryButton>
            </form>
          </Card>
        </div>
      </PageContainer>
    </section>
  );
}
