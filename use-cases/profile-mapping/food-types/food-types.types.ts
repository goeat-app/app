export interface FoodType {
  id: string;
  name: string;
  tagImage: string;
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
