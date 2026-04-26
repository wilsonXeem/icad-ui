export const adminNavItems = [
  {
    label: 'Overview',
    href: '/admin',
    roles: ['admin', 'instructor'],
  },
  {
    label: 'Courses',
    href: '/admin/courses',
    roles: ['admin', 'instructor'],
  },
  {
    label: 'Activity Review',
    href: '/admin/activity',
    roles: ['admin', 'instructor'],
  },
  {
    label: 'Inquiries',
    href: '/admin/inquiries',
    roles: ['admin'],
  },
  {
    label: 'Service Requests',
    href: '/admin/service-requests',
    roles: ['admin'],
  },
];

export const contactStatusOptions = [
  { value: 'new', label: 'New' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'resolved', label: 'Resolved' },
];

export const serviceRequestStatusOptions = [
  { value: 'new', label: 'New' },
  { value: 'reviewing', label: 'Reviewing' },
  { value: 'quoted', label: 'Quoted' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'closed', label: 'Closed' },
];

export const activityStatusOptions = [
  { value: 'submitted', label: 'Submitted' },
  { value: 'reviewed', label: 'Reviewed' },
  { value: 'approved', label: 'Approved' },
  { value: 'needs_revision', label: 'Needs Revision' },
];
