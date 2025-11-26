import {
  FoodType,
  FoodTypesError,
  FoodTypesSuccess,
} from '../food-types/food-types.types';

export type PlaceTypes = FoodType;
export type PlaceTypesResult = FoodTypesSuccess | FoodTypesError;
