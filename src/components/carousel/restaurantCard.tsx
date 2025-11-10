import { View, Image, TouchableOpacity } from 'react-native';
import { Typography } from '@/components/typography/typography';
import { StarIcon } from '@/assets/icons/star-icon';
import { LocationIcon } from '@/assets/icons/location';
import { MoneyIcon } from '@/assets/icons/money';

export const RestaurantCard = ({ item }) => {
  return (
    <TouchableOpacity
      className="w-64 mr-3 rounded-[15px] shadow-md overflow-hidden relative"
      style={{ elevation: 5 }}
    >
      <Image
        source={item.image}
        className="w-full h-48 rounded-lg"
        resizeMode="cover"
      />
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
              text={String(item.rating)}
            />
            <StarIcon width={14} height={14} />
          </View>

          <View className="flex-row items-center gap-1">
            <MoneyIcon scale={item.price} />
          </View>

          <View className="flex-row items-center gap-1">
            <LocationIcon width={11} height={14} fill={'#5F6368'} />
            <Typography
              type="body"
              className="text-[#5F6368] leading-tight"
              text={item.distance}
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
