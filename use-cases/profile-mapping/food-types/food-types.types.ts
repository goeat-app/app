export interface FoodType {
  id: string;
  name: string;
  slug: string;
}

export interface FoodTypesSuccess {
  success: true;
  data: FoodType[];
}

export interface FoodTypesError {
  success: false;
  error: string;
}

export type FoodTypesResult = FoodTypesSuccess | FoodTypesError;
