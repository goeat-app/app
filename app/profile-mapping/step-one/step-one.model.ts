import { useEffect, useState } from 'react';

import { getFoodTypesUseCase } from 'use-cases/profile-mapping/food-types/food-types.use-case';

import { loadingWrapper } from '@/hooks/loading-wrapper';
import { useProfileMappingStore } from '@/store/profile-mapping';

export const useStepOneModel = () => {
  const [selectedItem, setSelectedItem] = useState<string[]>([]);
  const progress = 0.33;
  const MAX_COUNT = 3;

  const setFoodCategories = useProfileMappingStore(
    state => state.setFoodCategories,
  );

  const foodCategories = useProfileMappingStore(state => state.foodCategories);

  const setSelectedFoodCategories = useProfileMappingStore(
    state => state.setSelectedFoodCategories,
  );

  async function loadFoodTypes() {
    const result = await loadingWrapper(() => getFoodTypesUseCase());

    if (result.success) {
      setFoodCategories(result.data);
    }
  }

  const handleSelect = (id: string) => {
    if (selectedItem.includes(id)) {
      setSelectedItem(selectedItem.filter(i => i !== id));
    } else if (selectedItem.length < MAX_COUNT) {
      setSelectedItem([...selectedItem, id]);
    }
  };

  const isMaxSelected = selectedItem.length >= MAX_COUNT;

  useEffect(() => {
    loadFoodTypes();
  }, []);

  return {
    selectedItem,
    progress,
    foodCategories,
    handleSelect,
    isMaxSelected,
    setSelectedFoodCategories,
  };
};
