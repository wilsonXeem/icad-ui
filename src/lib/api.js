import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export const api = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getApiErrorMessage = (error, fallback = 'Something went wrong.') => {
  if (error?.response?.data?.message) {
    return error.response.data.message;
  }

  if (error?.message) {
    return error.message;
  }

  return fallback;
};

export const extractPayload = (response) => response.data;
