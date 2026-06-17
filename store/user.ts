import { create } from 'zustand';

interface UserCoordinates {
  latitude: number;
  longitude: number;
}

interface SetLocationStatePayload {
  location: UserCoordinates;
  label: string;
}

interface User {
  userLocation: UserCoordinates;
  locationLabel: string;
  isLocationLoading: boolean;
  isLocationResolved: boolean;
  setLocationState: (payload: SetLocationStatePayload) => void;
  setIsLocationLoading: (isLoading: boolean) => void;
}

export const useUserStore = create<User>(set => ({
  userLocation: { latitude: 0, longitude: 0 },
  locationLabel: '',
  isLocationLoading: false,
  isLocationResolved: false,
  setLocationState: ({ location, label }) =>
    set({
      userLocation: location,
      locationLabel: label,
      isLocationResolved: true,
    }),
  setIsLocationLoading: isLocationLoading => set({ isLocationLoading }),
}));
