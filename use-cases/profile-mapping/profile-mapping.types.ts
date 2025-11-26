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

export type ProfileMappingResult = ProfileMappingSuccess | ProfileMappingError;
