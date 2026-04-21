import { View } from 'react-native';
import { RatingProps } from './rating-list.types';

export const RatingList = ({
  value,
  max = 5,
  size,
  filledColor = '#FFD700',
  emptyColor = '#E5E5E5',
  Icon,
}: RatingProps) => {
  return (
    <View className="flex flex-row">
      {Array.from({ length: max }).map((_, index) => {
        const isFilled = index < value;

        return (
          <Icon
            key={index}
            width={size}
            height={size}
            color={isFilled ? filledColor : emptyColor}
          />
        );
      })}
    </View>
  );
};
