import { View } from 'react-native';

import { RecommendedRestaurant } from 'use-cases/recommender/recommender.types';

import { LocationIcon } from '@/assets/icons/location-icon';
import { PhoneContactIcon } from '@/assets/icons/phone-contact-icon';
import { RouteIcon } from '@/assets/icons/route-icon';
import { WhatsappIcon } from '@/assets/icons/whatsapp-icon';
import { Button } from '@/components/button';
import { MoneyIcon } from '@/components/money-icon/money-icon';
import { Typography } from '@/components/typography/typography';

export const RestaurantContactInfo = (restaurant: RecommendedRestaurant) => {
  return (
    <View className="flex flex-col justify-around gap-4">
      <View className="flex flex-row w-full gap-2 -m-1 my-2">
        <MoneyIcon scale={3} color="#FF6B35" />
        <Typography
          type="span"
          className="text-[#4B5563] "
          text="Gasto médio de 80 reais por pessoa" // TODO: remover mock
        />
      </View>

      <View className="flex flex-row w-full items-center justify-between">
        <View className="flex items-center flex-row w-[70%] gap-2 ">
          <LocationIcon width={16} height={22} />
          <Typography
            type="span"
            className="text-[#4B5563] break-all"
            text={restaurant.address}
          />
        </View>

        <View className="flex items-end w-[30%]">
          <Button
            className="flex flex-row gap-1 w-[70px] h-[25px] rounded-xl bg-[#FFF8F4] items-center justify-center"
            style={{
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 4 },
              elevation: 4,
            }}
          >
            <RouteIcon />
            <Typography
              type="span"
              className="text-xs text-[#5D5959] font-poppins-medium leading-tight"
              text="Ver rota"
            />
          </Button>
        </View>
      </View>

      <View className="w-full flex flex-row items-center gap-4">
        <View className="flex flex-row items-center gap-2">
          <PhoneContactIcon />
          <Typography
            type="span"
            className="text-[#4B5563] "
            text="(11) 4002-8922" //TODO: remover mock
          />
        </View>

        <View className="flex flex-row items-center gap-2">
          <WhatsappIcon />
          <Typography
            type="span"
            className="text-[#4B5563] "
            text="(11) 94913-8922" //TODO: remover mock
          />
        </View>
      </View>
    </View>
  );
};
