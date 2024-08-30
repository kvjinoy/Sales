// src/services/api.ts
const HOST_API_URL = 'https://localhost:49159';
const API_ERROR = 'Network response was not ok';

export const fetchProducts = async () => {
    const response = await fetch(`${HOST_API_URL}/api/Product`);
    if (!response.ok) {
        throw new Error(API_ERROR);
    }
    return response.json();
};