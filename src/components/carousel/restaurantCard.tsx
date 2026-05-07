import { Animated, Image, View } from 'react-native';

import { FavoriteIcon } from '@/assets/icons/favorite-icon';
import { LocationIcon } from '@/assets/icons/location';
import { StarIcon } from '@/assets/icons/star-icon';
import { Button } from '@/components/button';
import { MoneyIcon } from '@/components/money-icon/money-icon';
import { Typography } from '@/components/typography/typography';
import { getImageSource } from '@/lib/utils/image-mapper';
import { RecommendedRestaurant } from 'use-cases/recommender/recommender.types';

type CarouselRestaurantCardProps = {
  item: RecommendedRestaurant;
  isFavorite: boolean;
  scaleAnim: Animated.Value;
  onFavoritePress: () => void;
};

export const RestaurantCard = ({
  item,
  isFavorite,
  scaleAnim,
  onFavoritePress,
}: CarouselRestaurantCardProps) => {
  return (
    <View
      className="w-64 mr-3 rounded-[15px] shadow-md overflow-hidden relative"
      style={{ elevation: 5 }}
    >
      <View className="relative">
        <Image
          source={getImageSource(item.slug)}
          className="w-full h-48 rounded-lg"
          resizeMode="cover"
        />
        <View className="absolute top-2 right-2">
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
        </View>
      </View>
      <View className="bg-white p-2 absolute bottom-2 left-3 right-3 rounded-xl flex-col gap-1">
        <Typography
          type="h4"
          className="text-[#003247] font-poppins-medium"
          text={item.name}
        />

        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-1">
            <Typography
              type="body"
              className="text-orange-500 font-poppins-medium leading-tight"
              text={String(item.avgRating)}
            />
            <StarIcon width={14} height={14} />
          </View>

          <View className="flex-row items-center gap-1">
            <MoneyIcon scale={item.priceLevel} />
          </View>

          <View className="flex-row items-center gap-1">
            <LocationIcon width={11} height={14} fill={'#5F6368'} />
            <Typography
              type="body"
              className="text-[#5F6368] leading-tight"
              text={
                (item as RecommendedRestaurant & { distance?: string }).distance ??
                ''
              }
            />
          </View>
        </View>
      </View>
    </View>
  );
};
