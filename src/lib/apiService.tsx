import axios from 'axios';

const API_BASE_URL = 'https://bgss-backend-f0a56abae7a1.herokuapp.com/'; // Replace with your API base URL
const apiService = axios.create({
    baseURL: API_BASE_URL,
});

export default async function handler(body : string) {
    try {
        const response = await apiService.post('/api/v1/auth/login', body, {
            headers: {
              'Content-Type': 'application/json'
            }
        });
        
        return response.data;
    } catch (error) {
       console.log(error);
    }
}

