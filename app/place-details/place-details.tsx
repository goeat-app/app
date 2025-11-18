import { Button } from '@/components/button';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { ImageBackground, StatusBar, View } from 'react-native';

export default function PlaceDetails() {
  return (
    <View className="flex-1 items-center bg-[#FDF6F5]">
      <View className="flex w-full">
        <ImageBackground
          source={require('@/assets/images/details/mock-restaurant-details.png')}
          className="w-full h-[400px] opacity-80"
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
      </View>
    </View>
  );
}
