export interface ProfileMappingSuccess {
  success: true;
}

export interface ProfileMappingError {
  success: false;
  error: string;
}

export interface PriceRangeParams {
  maxValue: number;
  minValue: number;
}

export interface CreateProfilePayload {
  userId: string;
  foodTypes: string[];
  placeTypes: string[];
  priceRange: PriceRangeParams;
}

export interface ProfileMapping {
  id: string;
  userId: string;
  priceRange: PriceRangeParams;
  foodTypes: { id: string }[];
  placeTypes: { id: string }[];
  createdAt: string;
  updatedAt: string;
}

export type GetProfileMappingResult =
  | { success: true; profileMapping: ProfileMapping | null }
  | ProfileMappingError;

export type ProfileMappingResult = ProfileMappingSuccess | ProfileMappingError;
