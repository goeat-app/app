import {
  Image,
  ImageSourcePropType,
  Pressable,
  ScrollView,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';

import { getRestaurantImageSource } from '@/lib/utils/restaurant-image';

import { RestaurantContactInfo } from '../components/restaurant-contact-info/restaurant-contact-info';
import { RestaurantHeaderDetails } from '../components/restaurant-header-details/restaurant-header-details';
import { RestaurantInfo } from '../components/restaurant-info/restaurant-info';
import { RestaurantReviews } from '../components/restaurant-reviews/restaurant-reviews';
import { IMAGE_HEIGHT, SHEET_OVERLAP } from '../consts/measures';
import { useRestaurantDetailsModel } from './restaurant-details.model';

const HEADER_HEIGHT = 56;

function getHeroResizeMode(
  restaurant: { imageUrl: string | null },
  source: ImageSourcePropType,
): 'cover' | 'contain' {
  if (restaurant.imageUrl) return 'cover';
  if (typeof source === 'object' && source !== null && 'uri' in source) {
    return 'cover';
  }
  return 'contain';
}

function handleGoBack() {
  if (router.canGoBack()) {
    router.back();
    return;
  }

  router.replace('/home/home');
}

export default function RestaurantDetails() {
  const { top: statusBarHeight, bottom: bottomInset } = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { restaurant } = useRestaurantDetailsModel({ restaurantId: id });

  const sheetTop = IMAGE_HEIGHT - SHEET_OVERLAP;
  const heroHeight = IMAGE_HEIGHT + statusBarHeight;

  if (!restaurant) return null;

  const imageSource = getRestaurantImageSource(restaurant);

  return (
    <View className="flex-1 bg-[#FDF6F5]">
      <View
        pointerEvents="none"
        style={{
          position: 'absolute',
          top: -statusBarHeight,
          left: 0,
          right: 0,
          width: '100%',
          height: heroHeight,
          overflow: 'hidden',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#E8E0DF',
        }}
      >
        <Image
          source={imageSource}
          style={{ width: '100%', height: '100%' }}
          resizeMode={getHeroResizeMode(restaurant, imageSource)}
        />
      </View>

      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 20,
          elevation: 20,
          height: HEADER_HEIGHT,
          justifyContent: 'center',
          paddingHorizontal: 8,
        }}
      >
        <Pressable
          onPress={handleGoBack}
          hitSlop={12}
          accessibilityRole="button"
          accessibilityLabel="Voltar"
          className="self-start"
        >
          <Ionicons
            name="arrow-back-circle-outline"
            size={42}
            color="#FF7947"
          />
        </Pressable>
      </View>

      <View
        className="overflow-hidden rounded-t-[32px] bg-[#FDF6F5]"
        style={{
          position: 'absolute',
          top: sheetTop,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      >
        <View className="px-2 pt-4">
          <RestaurantHeaderDetails {...restaurant} />
        </View>

        <View style={{ flex: 1, minHeight: 0 }}>
          <ScrollView
            style={{ flex: 1 }}
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled
            contentContainerStyle={{
              paddingHorizontal: 16,
              paddingTop: 16,
              paddingBottom: bottomInset + 24,
            }}
          >
            <View className="gap-12">
              <RestaurantContactInfo {...restaurant} />
              <RestaurantInfo restaurant={restaurant} />
              <RestaurantReviews />
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
}
