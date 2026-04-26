'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Card from '@/components/ui/Card';
import FormInput from '@/components/ui/FormInput';
import SelectInput from '@/components/ui/SelectInput';
import TextArea from '@/components/ui/TextArea';
import PrimaryButton from '@/components/ui/PrimaryButton';
import { getMyEnrollments, getCourseModules } from '@/lib/courses';
import { submitActivity } from '@/lib/activityPortal';
import { getApiErrorMessage } from '@/lib/api';

const submissionSchema = z.object({
  course: z.string().optional(),
  module: z.string().optional(),
  title: z.string().min(2, 'Title is required'),
  content: z.string().optional(),
  fileUrl: z.string().url('Enter a valid URL').optional().or(z.literal('')),
});

export default function SubmissionForm({ onSubmitted }) {
  const [enrollments, setEnrollments] = useState([]);
  const [modules, setModules] = useState([]);
  const [status, setStatus] = useState({ type: '', message: '' });
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(submissionSchema),
    defaultValues: {
      course: '',
      module: '',
      title: '',
      content: '',
      fileUrl: '',
    },
  });

  const selectedCourse = watch('course');

  useEffect(() => {
    const loadEnrollments = async () => {
      try {
        const response = await getMyEnrollments();
        setEnrollments(response.data || []);
      } catch (error) {
        setEnrollments([]);
      }
    };

    loadEnrollments();
  }, []);

  useEffect(() => {
    const loadModules = async () => {
      if (!selectedCourse) {
        setModules([]);
        return;
      }

      try {
        const response = await getCourseModules(selectedCourse);
        setModules(response.data || []);
      } catch (error) {
        setModules([]);
      }
    };

    loadModules();
  }, [selectedCourse]);

  const onSubmit = async (values) => {
    setStatus({ type: '', message: '' });

    try {
      const payload = {
        title: values.title,
        content: values.content || undefined,
        fileUrl: values.fileUrl || undefined,
        course: values.course || undefined,
        module: values.module || undefined,
      };
      const response = await submitActivity(payload);
      setStatus({ type: 'success', message: response.message || 'Submission created successfully.' });
      reset();
      setModules([]);
      onSubmitted?.();
    } catch (error) {
      setStatus({
        type: 'error',
        message: getApiErrorMessage(error, 'Unable to submit activity right now.'),
      });
    }
  };

  const courseOptions = [
    { value: '', label: 'General workspace submission' },
    ...enrollments.map((enrollment) => ({
      value: enrollment.course?._id || '',
      label: enrollment.course?.title || 'Untitled course',
    })),
  ];

  const moduleOptions = [
    { value: '', label: 'No module selected' },
    ...modules.map((module) => ({
      value: module._id,
      label: module.title,
    })),
  ];

  return (
    <Card className="p-6 sm:p-8">
      <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Assignment Submission</p>
      <h2 className="mt-3 font-heading text-2xl font-semibold text-white">Submit work to the activity portal.</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 grid gap-5">
        <SelectInput
          label="Course"
          name="course"
          register={register}
          error={errors.course}
          options={courseOptions}
        />
        <SelectInput
          label="Module"
          name="module"
          register={register}
          error={errors.module}
          options={moduleOptions}
          disabled={!modules.length}
        />
        <FormInput label="Submission title" name="title" register={register} error={errors.title} />
        <TextArea label="Content" name="content" register={register} error={errors.content} rows={5} />
        <FormInput
          label="File URL"
          name="fileUrl"
          placeholder="https://..."
          register={register}
          error={errors.fileUrl}
        />
        {status.message ? (
          <p className={`text-sm ${status.type === 'success' ? 'text-emerald-300' : 'text-rose-300'}`}>
            {status.message}
          </p>
        ) : null}
        <PrimaryButton type="submit" disabled={isSubmitting} className="w-full sm:w-fit">
          {isSubmitting ? 'Submitting activity...' : 'Submit activity'}
        </PrimaryButton>
      </form>
    </Card>
  );
}
