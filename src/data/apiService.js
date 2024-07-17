// apiService.js
import axios from 'axios';

const API_BASE_URL = 'https://localhost:7258'; // Replace with your API base URL

const apiService = axios.create({
  baseURL: API_BASE_URL,
});
//fetch data
export const fetchSomeData = async () => {
  try {
   
    const response = await apiService.get('/api/customer/getall');
    return response.data;
  } catch (error) {
    throw error;
  }
};