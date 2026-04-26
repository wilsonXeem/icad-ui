import { api, extractPayload } from './api';

export const getDashboardSummary = async () => {
  const response = await api.get('/dashboard/me');
  return extractPayload(response);
};
