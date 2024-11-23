import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080';

export const api = axios.create({
  baseURL: API_BASE_URL,
});

export interface WeatherCondition {
  temperature: number;
  windSpeed: number;
  windDirection: string;
  waveHeight: number;
  wavePeriod: number;
  waveDirection: string;
}

export interface Beach {
  id: number;
  name: string;
  lat: number;
  lng: number;
  rating: number;
  distance: number;
  surfCondition: string;
}

export const getWeatherConditions = async (lat: number, lng: number): Promise<WeatherCondition> => {
  try {
    const response = await api.get<WeatherCondition>(`/api/weather?lat=${lat}&lng=${lng}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching weather conditions:', error);
    throw error;
  }
};

export const getNearbyBeaches = async (lat: number, lng: number, limit: number = 5): Promise<Beach[]> => {
  try {
    const response = await api.get<Beach[]>(`/api/beaches/nearby?lat=${lat}&lng=${lng}&limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching nearby beaches:', error);
    throw error;
  }
};

