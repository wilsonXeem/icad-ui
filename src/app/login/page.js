import { Suspense } from 'react';
import LoginPanel from '@/components/shared/LoginPanel';

export const metadata = {
  title: 'Login',
  description: 'Secure login for the ICAD protected platform.',
};

export default function LoginPage() {
  return (
    <Suspense>
      <LoginPanel />
    </Suspense>
  );
}
