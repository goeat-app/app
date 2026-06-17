import { Pressable, View } from 'react-native';

import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Fontisto from '@expo/vector-icons/Fontisto';

interface StarRatingProps {
  rating: number;
  onChange: (rating: number) => void;
  size?: number;
  color?: string;
}

export const StarRating = ({
  rating,
  onChange,
  size = 42,
  color = '#FB9506',
}: StarRatingProps) => {
  const handlePress = (star: number) => {
    if (star === rating) {
      onChange(0);
    } else {
      onChange(star);
    }
  };

  return (
    <View className="flex-row gap-2">
      {[1, 2, 3, 4, 5].map(star => (
        <Pressable key={star} onPress={() => handlePress(star)}>
          {star <= rating ? (
            <Fontisto name="star" size={size} color={color} />
          ) : (
            <FontAwesome5 name="star" size={size} color={color} />
          )}
        </Pressable>
      ))}
    </View>
  );
};
