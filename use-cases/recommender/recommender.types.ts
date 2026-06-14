export interface RecommendedRestaurant {
  id: string;
  name: string;
  placeType: string;
  slug: string;
  foodType: string;
  priceLevel: number;
  address: string;
  city: string;
  state: string;
  avgRating: number;
  latitude: number;
  longitude: number;
}

export interface RecommenderSuccess {
  success: true;
  data: RecommendedRestaurant[];
}

export interface RecommenderError {
  success: false;
  error: string;
}

export type RecommenderResult = RecommenderSuccess | RecommenderError;
