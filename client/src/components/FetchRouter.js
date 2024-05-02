export const fetchRouter = async (url, options = {}) => {
    try {
        const baseUrl = 'REACT_APP_API_URL' || 'http://localhost:3000';
        const response = await fetch(`${baseUrl}/${url}`, { ...options });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Could not fetch data:', error);
        return [];
    }
};

/* How to use for the api keys 
const apiKey = 'your_api_key_here';

fetchRouter('api/endpoint', {
    headers: { 
        'X-API-Key': apiKey, // Custom header for API key
        'Content-Type': 'application/json'
    }
}); */
