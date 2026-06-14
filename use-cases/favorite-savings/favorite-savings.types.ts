import { RecommendedRestaurant } from 'use-cases/recommender/recommender.types';

/**
 * Mirrors backend `FavoriteSavingsResponseDto`.
 * GET includes full `restaurants` (same shape as recommendations).
 */
export interface FavoriteSavingsResponseDto {
  restaurantIds: string[];
  restaurants?: RecommendedRestaurant[];
}

/** Mirrors backend `SaveFavoriteSavingsDto`. */
export interface SaveFavoriteSavingsDto {
  userId: string;
  restaurantIds: string[];
}

export interface FavoriteSavingsSuccess<T> {
  success: true;
  data: T;
}

export interface FavoriteSavingsError {
  success: false;
  error: string;
}

export type FavoriteIdsResult =
  | FavoriteSavingsSuccess<string[]>
  | FavoriteSavingsError;

export type FavoriteRestaurantsResult =
  | FavoriteSavingsSuccess<RecommendedRestaurant[]>
  | FavoriteSavingsError;

export type ToggleFavoriteResult = { success: true } | FavoriteSavingsError;
