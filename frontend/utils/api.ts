import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080';

export const api = axios.create({
  baseURL: API_BASE_URL,
});

export const getWeatherConditions = async (lat: number, lng: number) => {
  try {
    const response = await api.get(`/api/weather?lat=${lat}&lng=${lng}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching weather conditions:', error);
    throw error;
  }
};

export const getNearbyBeaches = async (lat: number, lng: number, limit: number = 5) => {
  try {
    const response = await api.get(`/api/beaches/nearby?lat=${lat}&lng=${lng}&limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching nearby beaches:', error);
    throw error;
  }
};

