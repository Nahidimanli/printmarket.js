import axios from 'axios';

const API_URL = 'http://localhost:3000'; // Backend adresi

const api = axios.create({
    baseURL: API_URL,
});

export const getCategories = () => api.get('/categories').then(res => res.data);
export const getServices = (categoryId?: number, studioId?: number) =>
    api.get('/services', { params: { categoryId, studioId } }).then(res => res.data);
export const getServiceById = (id: number) => api.get(`/services/${id}`).then(res => res.data);
export const getStudios = () => api.get('/studios').then(res => res.data);
export const getStudioById = (id: number) => api.get(`/studios/${id}`).then(res => res.data);
export const getStudio = (id: number) => api.get(`/studios/${id}`).then(res => res.data);
export const getService = (id: number) => api.get(`/services/${id}`).then(res => res.data);

export default api;
