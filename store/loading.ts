import { create } from 'zustand';

interface LoaderSate {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

export const useLoaderStore = create<LoaderSate>(set => ({
  isLoading: false,
  setIsLoading: (isLoading: boolean) => set({ isLoading }),
}));
