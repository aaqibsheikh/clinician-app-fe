import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL;

export const uploadMedia = (formData: FormData) => {
  return axios.post(`${API_URL}/upload`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
