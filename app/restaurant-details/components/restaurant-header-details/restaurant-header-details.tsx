import { FavoriteIcon } from '@/assets/icons/favorite-icon';
import { StarIcon } from '@/assets/icons/star-icon';
import { Button } from '@/components/button';
import { Typography } from '@/components/typography/typography';
import { View } from 'react-native';

//TODO: Remover dados mockados

export const RestaurantHeaderDetails = () => {
  return (
    <View className="p-2 flex gap-4 items-center justify-between">
      <View className="flex flex-row h-[50px] w-full justify-between items-center">
        <View className="w-[90%]">
          <Typography
            type="h3"
            className="text-[#5E5959] font-poppins-semi-bold break-all"
            text="GIUGIU RESTAURANTE"
          />
        </View>

        <View className="w-[10%]">
          <Button className="flex w-[34px] h-[34px] rounded-full bg-[#E4DDDC] items-center justify-center">
            <FavoriteIcon fill="#000" />
          </Button>
        </View>
      </View>

      <View className="flex flex-row w-full justify-between items-center">
        <View className="flex flex-row gap-2 items-center justify-center">
          <Typography
            type="span"
            className="text-lg text-[#5E5959] font-poppins-medium leading-tight"
            text="4.6"
          />
          <StarIcon width={20} height={20} color="#FB9506" />
        </View>

        <Button
          className="flex flex-row w-[100px] h-[30px] items-center justify-center bg-[#E4DDDC]"
          disabled
          style={{
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            elevation: 2,
          }}
        >
          <Typography
            type="span"
            className="text-base text-[#5D5959] font-poppins-medium leading-tight"
            text="Check-in"
          />
        </Button>
      </View>
    </View>
  );
};
