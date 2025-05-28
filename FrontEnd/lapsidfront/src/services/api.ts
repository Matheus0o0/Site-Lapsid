import axios from "axios";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001/api',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
});


const getCSRFToken = () => {
    if (typeof document === 'undefined') return null;
    
    const name = 'csrftoken=';
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');
    
    for (let cookie of cookieArray) {
        cookie = cookie.trim();
        if (cookie.indexOf(name) === 0) {
            return cookie.substring(name.length, cookie.length);
        }
    }
    return null;
};

const fetchCSRFToken = async () => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001/api'}/csrf`, {
            method: 'GET',
            credentials: 'include',
        });
        if (!response.ok) {
            throw new Error('Failed to fetch CSRF token');
        }
        return getCSRFToken();
    } catch (error) {
        console.error('Error fetching CSRF token:', error);
        return null;
    }
};


api.interceptors.request.use(async (config) => {

    const methodsNeedingCSRF = ['post', 'put', 'patch', 'delete'];
    
    if (methodsNeedingCSRF.includes(config.method?.toLowerCase() || '')) {
        let csrfToken = getCSRFToken();
        

        if (!csrfToken) {
            csrfToken = await fetchCSRFToken();
        }
        
        if (csrfToken) {
            config.headers['X-CSRFToken'] = csrfToken;
        } else {
            console.error('No CSRF token available');
        }
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});


api.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 403 && error.response?.data?.detail?.includes('CSRF')) {

            const csrfToken = await fetchCSRFToken();
            if (csrfToken && error.config) {
                error.config.headers['X-CSRFToken'] = csrfToken;
                return api.request(error.config);
            }
        }
        return Promise.reject(error);
    }
);

export { api };