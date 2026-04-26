import { Suspense } from 'react';
import SignupPanel from '@/components/shared/SignupPanel';

export const metadata = {
  title: 'Sign Up',
  description: 'Create an ICAD account for protected dashboard, academy, and activity portal access.',
};

export default function SignupPage() {
  return (
    <Suspense>
      <SignupPanel />
    </Suspense>
  );
}
