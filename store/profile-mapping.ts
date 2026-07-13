import { FoodType } from 'use-cases/profile-mapping/food-types/food-types.types';
import { PlaceTypes } from 'use-cases/profile-mapping/place-types/place-types.types';
import { create } from 'zustand';

interface ProfileMappingState {
  hasCreatedProfileMapping: boolean;
  placeTypes: PlaceTypes[];
  foodCategories: FoodType[];
  selectedFoodCategories: string[];
  selectedPlaceTypes: string[];
  setFoodCategories: (categories: FoodType[]) => void;
  setSelectedFoodCategories: (id: string[]) => void;
  setPlaceTypes: (types: PlaceTypes[]) => void;
  setSelectedPlaceTypes: (id: string[]) => void;
  setHasCreatedProfileMapping: (hasCreated: boolean) => void;
}

export const useProfileMappingStore = create<ProfileMappingState>(set => ({
  hasCreatedProfileMapping: false,
  selectedPlaceTypes: [],
  selectedFoodCategories: [],
  foodCategories: [],
  placeTypes: [],
  setFoodCategories: (categories: FoodType[]) =>
    set({ foodCategories: categories }),
  setSelectedFoodCategories: (id: string[]) =>
    set({ selectedFoodCategories: id }),
  setPlaceTypes: (types: PlaceTypes[]) => set({ placeTypes: types }),
  setSelectedPlaceTypes: (id: string[]) => set({ selectedPlaceTypes: id }),
  setHasCreatedProfileMapping: (hasCreated: boolean) =>
    set({ hasCreatedProfileMapping: hasCreated }),
}));
