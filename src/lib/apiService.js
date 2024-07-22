import axios from 'axios';

const API_BASE_URL = 'https://back-end-project-1.onrender.com'; // Replace with your API base URL
const apiService = axios.create({
    baseURL: API_BASE_URL,
});

export default async function handler(body) {
    try {
        const response = await apiService.post('/api/v1/auth/login', body, {
            headers: {
              'Content-Type': 'application/json'
            }
        });
        
        return response;
    } catch (error) {
       console.log(error);
    }
}

