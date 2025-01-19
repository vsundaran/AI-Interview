import { jwtDecode } from 'jwt-decode';

export const setToken = (token) => {
    localStorage.setItem('token', token);
};

export const getToken = () => {
    return localStorage.getItem('token');
};

export const removeToken = () => {
    localStorage.removeItem('token');
};

export const getUserFromToken = () => {
    const token = getToken();
    if (token) {
        try {
            return jwtDecode(token);
        } catch (error) {
            console.error('Invalid token:', error);
            return null;
        }
    }
    return null;
};
