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