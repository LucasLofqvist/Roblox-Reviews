const baseUrl = 'https://playsafe.onrender.com';
export const FetchRouter = async (url, options = {}) => {
    try {
        const response = await fetch(`${baseUrl}/${url}`, { ...options });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Could not fetch data:', error);
        return [];
    }
};

export const authFetchRouter = async (url, options = {}) => {
    const token = sessionStorage.getItem('token');  // Retrieve the stored JWT
    const headers = {
        ...options.headers,
        'authorization': `Bearer ${token}`,  // Append the JWT as a Bearer token
    };
    return FetchRouter(url, { ...options, headers });  // Call FetchRouter with the updated headers
};


