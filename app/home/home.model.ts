import { loadingWrapper } from "@/hooks/loading-wrapper";
import { useAuthStore } from "@/store/auth-store";
import { useRecomendationsStore } from "@/store/recommender-store";
import { useEffect } from "react";
import { getRecommendationsUseCase } from "use-cases/recommender/recommender.use-case";

export const useHomeModel = () => {
  const user = useAuthStore(state => state.user);

  const setRestaurants = useRecomendationsStore(state => state.setRestaurants);
  const restaurants = useRecomendationsStore(state => state.restaurants);

  async function loadRecommendations() {
    const result = await loadingWrapper(() => getRecommendationsUseCase());

    if (result.success) {
      setRestaurants(result.data.slice(0, 3));
    }
  }

  useEffect(() => {
    loadRecommendations();
  }, []);

  return {
    user,
    restaurants
  }
};
