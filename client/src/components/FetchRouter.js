const FetchRouter = async (url, options = {}) => {
    try {
        const baseUrl = 'http://localhost:3000';
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

export default FetchRouter

