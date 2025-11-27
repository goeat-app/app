import {
  View,
  ImageBackground,
  Animated,
  ImageSourcePropType,
  StyleSheet,
} from 'react-native';

import { EnvironmentIcon } from '@/assets/icons/environment-icon';
import { FavoriteIcon } from '@/assets/icons/favorite-icon';
import { LocationIcon } from '@/assets/icons/location-icon';
import { Button } from '@/components/button';
import { MoneyIcon } from '@/components/money-icon/money-icon';
import { Typography } from '@/components/typography/typography';
import { RecommendedRestaurant } from 'use-cases/recommender/recommender.types';
import { getImageSource } from '@/lib/utils/image-mapper';

type RestaurantCardProps = {
  item: RecommendedRestaurant;
  isFavorite: boolean;
  scaleAnim: Animated.Value;
  onFavoritePress: () => void;
  onPress: () => void;
};

export function RestaurantCard({
  item,
  isFavorite,
  scaleAnim,
  onFavoritePress,
  onPress,
}: RestaurantCardProps) {
  return (
    <View className="w-[335px] h-[235px] rounded-s-2xl my-6 overflow-hidden">
      <View style={styles.imageContainer} className="w-full h-[150px] ">
        <ImageBackground
          className="w-full h-full flex items-end p-2"
          resizeMode="cover"
          source={getImageSource(item.tagImage)}
          imageStyle={{ borderTopLeftRadius: 16, borderTopRightRadius: 16 }}
        >
          <View style={styles.bottomOverlay} pointerEvents="none" />
          <Button onPress={onFavoritePress}>
            <Animated.View
              style={{
                transform: [{ scale: scaleAnim }],
              }}
            >
              <View className="flex w-[32px] h-[32px] bg-[#FF6B35] opacity-85 rounded-full items-center justify-center">
                <FavoriteIcon fill={isFavorite ? '#fff' : 'none'} />
              </View>
            </Animated.View>
          </Button>
        </ImageBackground>

        <View className="flex flex-row items-center justify-between w-full h-[35px] ">
          <View className="w-[40%]">
            <Typography
              type="h3"
              text={item.name}
              className="font-poppins-semi-bold"
              numberOfLines={1}
              ellipsizeMode="tail"
            />
          </View>
          <View>
            <MoneyIcon scale={item.priceLevel} />
          </View>

          <Button
            onPress={onPress}
            className="flex w-[70px] h-[25px] bg-[#003247] rounded-[4px] items-center justify-center"
          >
            <Typography
              text="Ver mais"
              type="h4"
              className="font-poppins-medium text-xs text-white"
            />
          </Button>
        </View>
        <View className="gap-2">
          <View className="flex flex-row gap-2">
            <EnvironmentIcon width={24} height={24} />
            <Typography
              text={`${item.placeType} - ${item.foodType}`}
              type="span"
              className="text-[#5F6368] text-base"
            />
          </View>
          <View className="flex flex-row gap-2">
            <LocationIcon width={10} height={13} />
            <View className="flex-1">
              <Typography
                text={`${item.address} - ${item.city}, ${item.state}`}
                type="span"
                className="text-[#5F6368] text-base"
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 6,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  bottomOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 38,
    backgroundColor: 'rgba(0,0,0,0.10)',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
});
