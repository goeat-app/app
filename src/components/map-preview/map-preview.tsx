import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';

import { ExpandIcon } from '@/assets/icons/expand-icon';
import { Typography } from '@/components/typography/typography';

export const MapPreview = () => {
  return (
    <View className="w-full flex-col gap-3">
      <View className="flex-row justify-between items-center">
        <Typography
          type="h3"
          className="font-poppins-medium text-[#003247]"
          text="Perto de você"
        />
        <TouchableOpacity>
          <ExpandIcon width={16} height={17} />
        </TouchableOpacity>
      </View>
      <Image
        source={require('@/assets/images/map.png')}
        className="w-full h-40 rounded-lg"
        resizeMode="cover"
      />
    </View>
  );
};
