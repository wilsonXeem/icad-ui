import DashboardClient from '@/components/dashboard/DashboardClient';

export const metadata = {
  title: 'Dashboard',
  description: 'Protected ICAD dashboard with course, progress, and activity visibility.',
};

export default function DashboardPage() {
  return <DashboardClient />;
}
