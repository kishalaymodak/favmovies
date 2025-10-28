import axios from "axios";

const API_URL = "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  register: (email: string, password: string, name: string) =>
    api.post("/auth/register", { email, password, name }),
  login: (email: string, password: string) =>
    api.post("/auth/login", { email, password }),
};

export const mediaAPI = {
  getMedia: (page: number, limit = 20) =>
    api.get(`/media?page=${page}&limit=${limit}`),
  createMedia: (data: any) => api.post("/media", data),
  updateMedia: (id: number, data: any) => api.put(`/media/${id}`, data),
  deleteMedia: (id: number) => api.delete(`/media/${id}`),
};

export default api;
