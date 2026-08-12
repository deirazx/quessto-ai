import axios from 'axios';
axios.defaults.baseURL = "/api";
axios.defaults.withCredentials = true;

export const googleAuth = async (userData) => {
    const response = await axios.post('/auth/google', userData);
    return response.data;
};

export const getCurrentUser = async () => {
    const response = await axios.get('/auth/current-user');
    return response.data;
};

export const logoutUserApi = async () => {
    const response = await axios.get('/auth/logout');
    return response.data;
};

export const generateNotesApi = async (formData) => {
    const response = await axios.post('/notes/generate', formData);
    return response.data;
};

export const getMyNotesApi = async () => {
    const response = await axios.get('/notes');
    return response.data;
};

export const getNoteByIdApi = async (noteId) => {
    const response = await axios.get(`/notes/${noteId}`);
    return response.data;
};

export const getDownloadPdfUrl = (noteId) => {
    return `/api/notes/${noteId}/pdf`;
};