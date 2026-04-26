'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import PageContainer from '@/components/shared/PageContainer';
import FormInput from '@/components/ui/FormInput';
import PrimaryButton from '@/components/ui/PrimaryButton';
import SecondaryButton from '@/components/ui/SecondaryButton';
import Card from '@/components/ui/Card';
import Loader from '@/components/ui/Loader';
import useAuth from '@/hooks/useAuth';

const loginSchema = z.object({
  email: z.string().email('Enter a valid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export default function LoginPanel() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextPath = searchParams.get('next') || '/dashboard';
  const { login, isAuthenticating, isAuthenticated, isLoading } = useAuth();
  const [errorMessage, setErrorMessage] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.replace('/dashboard');
    }
  }, [isAuthenticated, isLoading, router]);

  const onSubmit = async (values) => {
    setErrorMessage('');
    const result = await login(values);

    if (!result.success) {
      setErrorMessage(result.message || 'Unable to log in.');
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
            <span className="eyebrow">Secure Access</span>
            <h1 className="font-heading text-4xl font-semibold leading-tight text-white sm:text-5xl">
              Log in to the protected ICAD platform.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-slate-300">
              Access your dashboard, activity portal, course workspace, and future collaboration surfaces through
              the secure ICAD environment.
            </p>
            <Card>
              <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Inside the platform</p>
              <div className="mt-5 grid gap-3">
                {[
                  'Protected dashboard and course access',
                  'Assignment submission and instructor feedback',
                  'Activity portal and future research collaboration tools',
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
              <FormInput label="Email" name="email" type="email" register={register} error={errors.email} />
              <FormInput
                label="Password"
                name="password"
                type="password"
                register={register}
                error={errors.password}
              />
              {errorMessage ? <p className="text-sm text-rose-300">{errorMessage}</p> : null}
              <PrimaryButton type="submit" disabled={isAuthenticating} className="w-full sm:w-fit">
                {isAuthenticating ? 'Signing in...' : 'Log in'}
              </PrimaryButton>
              <div className="flex flex-wrap gap-3">
                <SecondaryButton href="/signup" className="w-full sm:w-fit">
                  Create account
                </SecondaryButton>
                <SecondaryButton href="/contact" className="w-full sm:w-fit">
                  Need access or support?
                </SecondaryButton>
              </div>
            </form>
          </Card>
        </div>
      </PageContainer>
    </section>
  );
}
