export const FetchRouter = async (url, options = {}) => {
    try {
        const baseUrl = 'http://localhost:3000';
        const response = await fetch(`${baseUrl}/${url}`, { ...options });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Could not fetch data:', error);
        return [];
    }
};

export const authFetchRouter = async (url, options = {}) => {
    const token = sessionStorage.getItem('token'); 
    const headers = {
        ...options.headers,
        'authorization': `Bearer ${token}`, 
    };
    return FetchRouter(url, { ...options, headers });  
};


