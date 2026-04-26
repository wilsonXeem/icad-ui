import AdminServiceRequestsClient from '@/components/admin/AdminServiceRequestsClient';

export const metadata = {
  title: 'Admin Service Requests',
  description: 'Review and manage research service request workflow.',
};

export default function AdminServiceRequestsPage() {
  return <AdminServiceRequestsClient />;
}
