import ActivityPortalClient from '@/components/activityPortal/ActivityPortalClient';

export const metadata = {
  title: 'Activity Portal',
  description: 'Protected activity portal for submissions, feedback, and research task tracking.',
};

export default function ActivityPortalPage() {
  return <ActivityPortalClient />;
}
