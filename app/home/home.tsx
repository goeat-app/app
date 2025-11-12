import { useRef } from 'react';
import { View, Animated, ScrollView } from 'react-native';

import { Typography } from '@/components/typography/typography';
import { Header } from '@/components/header/header';
import { Chips } from '@/components/chips/chips';
import { Location } from '@/components/location/location';
import { Carousel } from '@/components/carousel/carousel';
import { MapPreview } from '@/components/mapPreview/mapPreview';
import { TabBar } from '@/components/tabBar/tabBar';

export default function Home() {
  const tabBarTranslateY = useRef(new Animated.Value(0)).current;
  const hide_value = 150;

  const hideTabBar = () => {
    Animated.timing(tabBarTranslateY, {
      toValue: hide_value,
      duration: 250,
      useNativeDriver: true,
    }).start();
  };

  const showTabBar = () => {
    Animated.timing(tabBarTranslateY, {
      toValue: 0,
      duration: 250,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View className="flex-1 bg-[#FDF6F5]">
      <View className="px-4">
        <Header />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 120 }}
        onScrollBeginDrag={hideTabBar}
        onScrollEndDrag={showTabBar}
        onMomentumScrollEnd={showTabBar}
      >
        <View className="items-left justify-left gap-6">
          <View className="w-full flex-col gap-2">
            <Typography
              type="h2"
              className="text-[#003247] font-poppins-medium"
              text="Oi, fulano!"
            />
            <Typography
              type="h5"
              className="text-[#003247] font-poppins-regular"
              text="O que você está com vontade de comer hoje?"
            />
            <Chips />
            <Location />
          </View>
          <Carousel />
          <MapPreview />
        </View>
      </ScrollView>
      <TabBar translateY={tabBarTranslateY} />
    </View>
  );
}
