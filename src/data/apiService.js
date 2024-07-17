import data from './tabledatatest.json';
// apiService.js
import axios from 'axios';
import { unstable_noStore as noStore } from 'next/cache';
const API_BASE_URL = 'https://localhost:7258'; // Replace with your API base URL
const PAGE_ITEMS_LENGTH = 6;
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

export const getDataTestTable = (query , currentPage) => {
  noStore();
  const offset = (currentPage - 1) * PAGE_ITEMS_LENGTH;
  try {
   
    const response = data.users.slice(offset,offset+PAGE_ITEMS_LENGTH);
    return response;
  } catch (error) {
    throw error;
  }
};
export const getDataTestPages = () => {
  try {
   
    const response = Math.ceil(Number(data.users.length)/PAGE_ITEMS_LENGTH);
    return response;
  } catch (error) {
    throw error;
  }
};