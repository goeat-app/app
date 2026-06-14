import { useRecomendationsStore } from '@/store/recommender-store';

export const useRecommendationsMapModel = () => {
  const recommendations = useRecomendationsStore(state => state.restaurants);

  console.log('recommendations', recommendations);

  return {
    recommendations,
  };
};
