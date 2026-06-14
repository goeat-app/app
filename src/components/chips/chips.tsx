import { View } from 'react-native';

import { ChipButton } from '@/components/chips/chipsButton';
import { mealTypes } from '@/constants/filterConstants';
import { useFilterStore } from '@/store/restaurant-filter-store';

export const Chips = () => {
  const filters = useFilterStore(state => state.filters);
  const setFilters = useFilterStore(state => state.setFilters);

  const handleChipPress = (option: string) => {
    const current = filters.mealTypes;
    const updated = current.includes(option)
      ? current.filter(item => item !== option)
      : [...current, option];
    setFilters({ ...filters, mealTypes: updated });
  };

  return (
    <View className="flex-row items-center gap-1">
      {mealTypes.map(option => {
        const isSelected = filters.mealTypes.includes(option);
        return (
          <ChipButton
            key={option}
            text={option}
            isSelected={isSelected}
            onPress={() => handleChipPress(option)}
          />
        );
      })}
    </View>
  );
};
