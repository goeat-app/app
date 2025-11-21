import { useRef } from 'react';
import { View, ScrollView } from 'react-native';

import { Carousel } from '@/components/carousel/carousel';
import { Chips } from '@/components/chips/chips';
import { Header } from '@/components/header/header';
import { Location } from '@/components/location/location';
import { MapPreview } from '@/components/map-preview/map-preview';
import { TabBar } from '@/components/tabBar/tabBar';
import { Typography } from '@/components/typography/typography';
import { TabBarRef } from '@/components/tabBar/tabBar.model';

export default function Home() {
  const tabBarRef = useRef<TabBarRef>(null);

  return (
    <View className="flex-1 bg-[#FDF6F5]">
      <View className="px-4">
        <Header />
      </View>
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 120 }}
        onScrollBeginDrag={() => tabBarRef.current?.hide()}
        onScrollEndDrag={() => tabBarRef.current?.show()}
        onMomentumScrollEnd={() => tabBarRef.current?.show()}
      >
        <View className="items-left justify-left gap-5">
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
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <Chips />
            </ScrollView>
            <Location />
          </View>
          <Carousel />
          <MapPreview />
        </View>
      </ScrollView>
      <TabBar ref={tabBarRef} />
    </View>
  );
}
