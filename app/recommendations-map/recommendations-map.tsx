import { Image, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import { Ionicons } from '@expo/vector-icons';

import { StarIcon } from '@/assets/icons/star-icon';
import { Button } from '@/components/button';
import { Typography } from '@/components/typography/typography';
import BottomSheet from '@/components/ui/bottom-sheet/bottom-sheet';

import { useRecommendationsMapModel } from './recommendations-map.model';

export default function RecommendationsMap() {
  const { recommendations } = useRecommendationsMapModel();

  return (
    <View className="flex-1">
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: -22.9,
          longitude: -47.06,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        {recommendations.map(recommendation => (
          <Marker
            key={recommendation.id}
            coordinate={{
              latitude: recommendation.latitude,
              longitude: recommendation.longitude,
            }}
            title={recommendation.name}
          >
            <Image
              resizeMode="cover"
              source={require('@/assets/images/goat-logo.png')}
              className="w-[30px] h-[30px] rounded-full"
            />
          </Marker>
        ))}
      </MapView>
      <BottomSheet>
        <View className="flex gap-10">
          <View className="flex flex-col gap-4">
            <Typography
              type="span"
              text={'Recomendados para você'.toUpperCase()}
              className="text-sm font-be-vietnam-pro-semi-bold text-[#E86D17]"
            />

            <Typography
              type="h2"
              text="Saboreie o Momento"
              className="font-plus-jakarta-semi-bold"
            />
          </View>
          <View className="flex flex-row  p-2 h-28 w-full bg-[#F1F0F5] rounded-2xl gap-4">
            <View className="flex items-center justify-center">
              <Image
                resizeMode="cover"
                className="rounded-xl w-[80px] h-[80px]"
                source={require('@/assets/images/details/mock-restaurant-details.png')}
              />
            </View>

            <View className="flex items-start gap-2">
              <Typography
                type="h4"
                text="The Golden Roll"
                className="font-plus-jakarta-sans"
              />

              <View className="flex-row gap-4">
                <View className="flex flex-row gap-2 items-center justify-center">
                  <Typography
                    type="span"
                    className="text-lg text-[#E86D17] font-plus-jakarta-sans leading-tight"
                    text="4.8"
                  />
                  <StarIcon width={18} height={18} color="#E86D17" />
                </View>

                <View className="flex items-center justify-center">
                  <Typography
                    type="span"
                    text="● 1.5km de você"
                    className="text-[#474747] font-be-vietnam-pro-medium"
                  />
                </View>
              </View>

              <Button className="flex flex-row items-center justify-center">
                <Typography
                  type="span"
                  text={'Ver detalhes'.toUpperCase()}
                  className="text-[10px] font-be-vietnam-pro-semi-bold text-[#E86D17]"
                />
                <Ionicons name="chevron-forward" size={14} color="#FF7947" />
              </Button>
            </View>
          </View>
        </View>
      </BottomSheet>
    </View>
  );
}
