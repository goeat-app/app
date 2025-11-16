import { useState } from 'react';
import { View } from 'react-native';

import { ChipButton } from '@/components/chips/chipsButton';

const options = ['Breakfast', 'Lunch', 'Dinner', 'Brunch', 'Dessert'];

export const Chips = () => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleChipPress = (option: string) => {
    setSelectedOptions(prevSelected => {
      if (prevSelected.includes(option)) {
        return prevSelected.filter(item => item !== option);
      } else {
        return [...prevSelected, option];
      }
    });
  };

  return (
    <View className="flex-row items-center gap-1">
      {options.map(option => {
        const isSelected = selectedOptions.includes(option);
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
