
export interface RecommendedRestaurant {
  id: string;
  name: string;
  placeType: string;
  tagImage: string;
  foodType: string;
  priceLevel: number;
  address: string;
  city: string;
  state: string;
  avgRating: number;
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
