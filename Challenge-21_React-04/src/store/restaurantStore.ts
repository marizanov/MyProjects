// src/store/useRestaurantStore.ts
import { create } from 'zustand';
import { RestaurantsEntity } from '../interfaces/DataInterface';

interface RestaurantState {
  restaurants: RestaurantsEntity[];
  fetchRestaurants: () => Promise<void>;
}

export const useRestaurantStore = create<RestaurantState>((set) => ({
  restaurants: [],
  fetchRestaurants: async () => {
    const response = await fetch('http://localhost:5001/restaurants');
    const data = await response.json();
    set({ restaurants: data });
  },
}));