import { api, extractPayload } from './api';

export const getMyActivitySubmissions = async (params = {}) => {
  const response = await api.get('/activity-submissions/me', { params });
  return extractPayload(response);
};

export const submitActivity = async (payload) => {
  const response = await api.post('/activity-submissions', payload);
  return extractPayload(response);
};

export const getActivitySubmissions = async (params = {}) => {
  const response = await api.get('/activity-submissions', { params });
  return extractPayload(response);
};

export const updateActivityFeedback = async (submissionId, feedback) => {
  const response = await api.patch(`/activity-submissions/${submissionId}/feedback`, { feedback });
  return extractPayload(response);
};

export const updateActivityStatus = async (submissionId, status) => {
  const response = await api.patch(`/activity-submissions/${submissionId}/status`, { status });
  return extractPayload(response);
};
