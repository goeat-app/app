import react from 'react';
import { View } from 'react-native';
import { Typography } from '@/components/typography/typography';
import { LocationIcon } from '@/assets/icons/location';

export const Location = () => {
  return (
    <View className="flex-row items-center">
      <LocationIcon width={16} height={16} fill="#FF6B35" />
      <Typography
        type="body"
        className="text-[#003247] font-poppins-medium"
        text="Rua dos famintos, 123 - SP"
      />
    </View>
  );
};
