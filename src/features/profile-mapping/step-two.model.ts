import { useEffect, useState } from 'react';

import { getPlaceTypesUseCase } from 'use-cases/profile-mapping/place-types/place-types.use-case';

import { loadingWrapper } from '@/hooks/loading-wrapper';
import { useProfileMappingStore } from '@/store/profile-mapping';

export const useStepTwoModel = () => {
  const progress = 0.66;
  const MAX_COUNT = 3;
  const [selectedEnvironment, setSelectedEnvironment] = useState<string[]>([]);

  const setPlaceTypes = useProfileMappingStore(state => state.setPlaceTypes);

  const placeTypes = useProfileMappingStore(state => state.placeTypes);

  const setSelectedPlaceTypes = useProfileMappingStore(
    state => state.setSelectedPlaceTypes,
  );

  async function loadPlaceTypes() {
    const result = await loadingWrapper(() => getPlaceTypesUseCase());

    if (result.success) {
      setPlaceTypes(result.data);
    }
  }

  const handleSelectEnvironment = (id: string) => {
    if (selectedEnvironment.includes(id)) {
      setSelectedEnvironment(selectedEnvironment.filter(i => i !== id));
    } else if (selectedEnvironment.length < MAX_COUNT) {
      setSelectedEnvironment([...selectedEnvironment, id]);
    }
  };

  const isMaxSelected = selectedEnvironment.length >= MAX_COUNT;

  useEffect(() => {
    loadPlaceTypes();
  }, []);

  return {
    progress,
    selectedEnvironment,
    handleSelectEnvironment,
    placeTypes,
    setSelectedPlaceTypes,
    isMaxSelected,
  };
};
