import { useState } from 'react';

interface Ratings {
  service: number;
  foodAndDrink: number;
  price: number;
}

export const useReviewsModel = () => {
  const [ratings, setRatings] = useState<Ratings>({
    service: 0,
    foodAndDrink: 0,
    price: 0,
  });

  const setRating = (category: keyof Ratings, value: number) => {
    setRatings(prev => ({ ...prev, [category]: value }));
  };

  return { ratings, setRating };
};
