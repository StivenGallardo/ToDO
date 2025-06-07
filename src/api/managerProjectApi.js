import axios from 'axios';
import { getEnvVariables } from '../helpers/getEnvVariables';

const { VITE_API_URL } = getEnvVariables();

const managerProjectApi = axios.create({
    baseURL: VITE_API_URL,
});

// Configurar interceptores de solicitud
managerProjectApi.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    // Manejar errores de solicitud
    return Promise.reject(error);
});

// Configurar interceptores de respuesta
managerProjectApi.interceptors.response.use(response => {
    // Puedes procesar la respuesta aquí si es necesario
    return response;
}, error => {
    // Manejar errores de respuesta
    /*if (error.response && error.response.status === 401) {
        // Por ejemplo, redirigir al usuario al login si el token es inválido
        window.location.href = '/auth/login';
    }*/
    return Promise.reject(error);
});

export default managerProjectApi;