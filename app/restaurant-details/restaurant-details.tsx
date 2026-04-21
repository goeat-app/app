import { Button } from '@/components/button';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Dimensions, Image, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RestaurantHeaderDetails } from './components/restaurant-header-details/restaurant-header-details';
import { RestaurantInfo } from './components/restaurant-info/restaurant-info';
import { RestaurantContactInfo } from './components/restaurant-contact-info/restaurant-contact-info';
import { RestaurantReviews } from './components/restaurant-reviews/restaurant-reviews';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const IMAGE_HEIGHT = SCREEN_HEIGHT * 0.45;
const BACK_BUTTON_PADDING = 124;

export default function RestaurantDetails() {
  const { top: statusBarHeight } = useSafeAreaInsets();
  const MIN_VISIBLE_IMAGE = statusBarHeight + BACK_BUTTON_PADDING;
  const CARD_HEIGHT = SCREEN_HEIGHT - MIN_VISIBLE_IMAGE;

  return (
    <View className="flex-1">
      <Image
        source={require('@/assets/images/details/mock-restaurant-details.png')} //TODO: Remover dados mockados
        className={`w-full h-[${IMAGE_HEIGHT}px] absolute`}
        resizeMode="cover"
      />

      <View className="p-2 absolute">
        <Button onPress={() => router.back()}>
          <Ionicons
            name="arrow-back-circle-outline"
            size={42}
            color="#FF7947"
          />
        </Button>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: IMAGE_HEIGHT - 80 }}
        nestedScrollEnabled
      >
        <View
          style={{ height: CARD_HEIGHT }}
          className={`rounded-t-[32px] bg-[#FDF6F5] py-4`}
        >
          <View className="p-2">
            <RestaurantHeaderDetails />
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled
            contentContainerStyle={{
              paddingHorizontal: 16,
              paddingBottom: 120,
            }}
          >
            <View className="gap-12">
              <RestaurantContactInfo />
              <RestaurantInfo />
              <RestaurantReviews />
            </View>
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
}
