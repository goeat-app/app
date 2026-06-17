import { create } from 'zustand';

interface Location {
  latitude: number;
  longitude: number;
}

interface User {
  userLocation: Location;
  setUserLocation: (location: Location) => void;
}

export const useUserStore = create<User>(set => ({
  userLocation: { latitude: 0, longitude: 0 },
  setUserLocation: (location: Location) => set({ userLocation: location }),
}));
