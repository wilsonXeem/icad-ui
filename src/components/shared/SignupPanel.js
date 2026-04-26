'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import PageContainer from '@/components/shared/PageContainer';
import FormInput from '@/components/ui/FormInput';
import SelectInput from '@/components/ui/SelectInput';
import PrimaryButton from '@/components/ui/PrimaryButton';
import SecondaryButton from '@/components/ui/SecondaryButton';
import Card from '@/components/ui/Card';
import Loader from '@/components/ui/Loader';
import useAuth from '@/hooks/useAuth';

const signupSchema = z
  .object({
    fullName: z.string().min(2, 'Full name is required'),
    email: z.string().email('Enter a valid email'),
    role: z.enum(['student', 'client']),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string().min(8, 'Confirm your password'),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

const roleOptions = [
  { value: 'student', label: 'Student' },
  { value: 'client', label: 'Client / Research Partner' },
];

export default function SignupPanel() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextPath = searchParams.get('next') || '/dashboard';
  const { signup, isAuthenticating, isAuthenticated, isLoading } = useAuth();
  const [errorMessage, setErrorMessage] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fullName: '',
      email: '',
      role: 'student',
      password: '',
      confirmPassword: '',
    },
  });

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.replace('/dashboard');
    }
  }, [isAuthenticated, isLoading, router]);

  const onSubmit = async (values) => {
    setErrorMessage('');
    const result = await signup({
      fullName: values.fullName,
      email: values.email,
      role: values.role,
      password: values.password,
    });

    if (!result.success) {
      setErrorMessage(result.message || 'Unable to create your account.');
      return;
    }

    router.push(nextPath);
  };

  if (isLoading) {
    return (
      <section className="section-shell pt-28">
        <PageContainer>
          <div className="flex min-h-[50vh] items-center justify-center">
            <Loader label="Checking session..." />
          </div>
        </PageContainer>
      </section>
    );
  }

  return (
    <section className="section-shell pt-28">
      <PageContainer>
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-6">
            <span className="eyebrow">Join ICAD</span>
            <h1 className="font-heading text-4xl font-semibold leading-tight text-white sm:text-5xl">
              Create your account for the ICAD platform.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-slate-300">
              Sign up to access the protected ICAD environment for academy participation, dashboard access,
              research-facing workflows, and activity submissions.
            </p>
            <Card>
              <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Account access</p>
              <div className="mt-5 grid gap-3">
                {[
                  'Student access for academy and structured learning workflows',
                  'Client access for research-facing collaboration and service engagement',
                  'Protected dashboard and activity portal access after authentication',
                ].map((item) => (
                  <div key={item} className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-slate-200">
                    {item}
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <Card className="p-6 sm:p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="grid gap-5">
              <FormInput label="Full name" name="fullName" register={register} error={errors.fullName} />
              <div className="grid gap-5 md:grid-cols-2">
                <FormInput label="Email" name="email" type="email" register={register} error={errors.email} />
                <SelectInput
                  label="Account type"
                  name="role"
                  register={register}
                  error={errors.role}
                  options={roleOptions}
                />
              </div>
              <div className="grid gap-5 md:grid-cols-2">
                <FormInput
                  label="Password"
                  name="password"
                  type="password"
                  register={register}
                  error={errors.password}
                />
                <FormInput
                  label="Confirm password"
                  name="confirmPassword"
                  type="password"
                  register={register}
                  error={errors.confirmPassword}
                />
              </div>
              {errorMessage ? <p className="text-sm text-rose-300">{errorMessage}</p> : null}
              <PrimaryButton type="submit" disabled={isAuthenticating} className="w-full sm:w-fit">
                {isAuthenticating ? 'Creating account...' : 'Create account'}
              </PrimaryButton>
              <div className="flex flex-wrap gap-3">
                <SecondaryButton href="/login" className="w-full sm:w-fit">
                  Already have an account?
                </SecondaryButton>
                <SecondaryButton href="/contact" className="w-full sm:w-fit">
                  Need support?
                </SecondaryButton>
              </div>
            </form>
          </Card>
        </div>
      </PageContainer>
    </section>
  );
}
