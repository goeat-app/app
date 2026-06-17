import { View } from 'react-native';

import { LocationIcon } from '@/assets/icons/location';
import { Typography } from '@/components/typography/typography';
import { useUserLocation } from '@/hooks/use-user-location';

export const Location = () => {
  const { locationLabel } = useUserLocation();

  return (
    <View className="flex-row items-center gap-2">
      <LocationIcon width={16} height={16} fill="#FF6B35" />
      <Typography
        type="body"
        className="text-[#003247] font-poppins-medium"
        text={locationLabel}
      />
    </View>
  );
};
