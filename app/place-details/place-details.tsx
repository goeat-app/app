import { Button } from '@/components/button';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { ImageBackground, ScrollView, View } from 'react-native';
import { HeaderRestaurantDetails } from './components/header-restaurant-details/header-restaurant-details';
import { ContactInfoDetails } from './components/contact-info-details/contact-info-details';
import { RestaurantInfo } from './components/restaurant-info/restaurant-info';

export default function PlaceDetails() {
  return (
    <View className="flex-1 items-center justify-between">
      <View className="flex w-full h-full">
        <ImageBackground
          source={require('@/assets/images/details/mock-restaurant-details.png')} //TODO: Remover dados mockados
          className="w-full h-full"
          resizeMode="cover"
        >
          <Button onPress={() => router.back()} className="p-2">
            <Ionicons
              name="arrow-back-circle-outline"
              size={42}
              color="#FF7947"
            />
          </Button>
        </ImageBackground>

        <View className="flex w-full h-[400px] rounded-t-[32px] bg-[#FDF6F5] absolute bottom-0 py-4 ">
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: 16,
              paddingBottom: 120,
            }}
          >
            <View className="gap-12">
              <HeaderRestaurantDetails />
              <ContactInfoDetails />
              <RestaurantInfo />
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
}
