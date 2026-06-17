import { useEffect, useState } from 'react';

import { restaurantDetailsService } from 'services/restaurant-details-service';
import { RecommendedRestaurant } from 'use-cases/recommender/recommender.types';

import { loadingWrapper } from '@/hooks/loading-wrapper';

interface UseRestaurantDetailsModelProps {
  restaurantId: string;
}

export const useRestaurantDetailsModel = ({
  restaurantId,
}: UseRestaurantDetailsModelProps) => {
  const [restaurant, setRestaurant] = useState<RecommendedRestaurant>();

  useEffect(() => {
    if (!restaurantId) return;

    loadingWrapper(() => restaurantDetailsService.getById(restaurantId)).then(
      setRestaurant,
    );
  }, [restaurantId]);

  return { restaurant };
};
