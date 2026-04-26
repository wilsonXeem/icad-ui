import { api, extractPayload } from './api';

export const getCourses = async (params = {}) => {
  const response = await api.get('/courses', { params });
  return extractPayload(response);
};

export const getPublishedCourses = async (params = {}) => getCourses(params);

export const getCourseBySlug = async (slug) => {
  const response = await api.get(`/courses/${slug}`);
  return extractPayload(response);
};

export const getCourseModules = async (courseId) => {
  const response = await api.get(`/courses/${courseId}/modules`);
  return extractPayload(response);
};

export const getMyEnrollments = async () => {
  const response = await api.get('/enrollments/me');
  return extractPayload(response);
};

export const createCourse = async (payload) => {
  const response = await api.post('/courses', payload);
  return extractPayload(response);
};

export const updateCourse = async (courseId, payload) => {
  const response = await api.patch(`/courses/${courseId}`, payload);
  return extractPayload(response);
};

export const deleteCourse = async (courseId) => {
  const response = await api.delete(`/courses/${courseId}`);
  return extractPayload(response);
};

export const createCourseModule = async (courseId, payload) => {
  const response = await api.post(`/courses/${courseId}/modules`, payload);
  return extractPayload(response);
};

export const updateCourseModule = async (moduleId, payload) => {
  const response = await api.patch(`/modules/${moduleId}`, payload);
  return extractPayload(response);
};

export const deleteCourseModule = async (moduleId) => {
  const response = await api.delete(`/modules/${moduleId}`);
  return extractPayload(response);
};
