import { RecommendedRestaurant } from "use-cases/recommender/recommender.types";
import { create } from "zustand";

interface RecomendationsState {
  restaurants: RecommendedRestaurant[];
  setRestaurants: (restaurants: RecommendedRestaurant[]) => void;
}

export const useRecomendationsStore = create<RecomendationsState>(set => ({
  restaurants: [],
  setRestaurants: (restaurants: RecommendedRestaurant[]) =>
    set({ restaurants }),
}));
