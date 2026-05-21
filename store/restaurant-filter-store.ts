import { create } from 'zustand';
import { defaultMinPrice, defaultMaxPrice } from '@/constants/filterConstants';

export interface RestaurantFilters {
  minRating: number;
  foodTypes: string[];
  restaurantStyles: string[];
  mealTypes: string[];
  minPrice: number;
  maxPrice: number;
  paymentMethods: string[];
  voucherTypes: string[];
}

interface FilterStore {
  filters: RestaurantFilters;
  isFilterOpen: boolean;
  setFilters: (filters: RestaurantFilters) => void;
  openFilter: () => void;
  closeFilter: () => void;
  clearFilters: () => void;
}

export const defaultFilters: RestaurantFilters = {
  minRating: 0,
  foodTypes: [],
  restaurantStyles: [],
  mealTypes: [],
  minPrice: defaultMinPrice,
  maxPrice: defaultMaxPrice,
  paymentMethods: [],
  voucherTypes: [],
};

export const useFilterStore = create<FilterStore>(set => ({
  filters: defaultFilters,
  isFilterOpen: false,
  setFilters: filters => set({ filters }),
  openFilter: () => set({ isFilterOpen: true }),
  closeFilter: () => set({ isFilterOpen: false }),
  clearFilters: () => set({ filters: defaultFilters }),
}));
