import { View } from 'react-native';

import { RestaurantDetails } from 'use-cases/recommender/recommender.types';

import { CandleIcon } from '@/assets/icons/env-type/candle-icon';
import { ModernPlaceIcon } from '@/assets/icons/env-type/modern-place-icon';
import { EloIcon } from '@/assets/icons/payment-methods/elo-icon';
import { MastercardIcon } from '@/assets/icons/payment-methods/mastercard-icon';
import { SodexoIcon } from '@/assets/icons/payment-methods/sodexo-icon';
import { VisaIcon } from '@/assets/icons/payment-methods/visa-icon';
import { PhotoGallery } from '@/components/photo-gallery/photo-gallery';
import { Tag } from '@/components/tag';
import { Typography } from '@/components/typography/typography';

type RestaurantInfoProps = {
  restaurant: RestaurantDetails;
};

const DEFAULT_ICON = ModernPlaceIcon;

function buildTags(restaurant: RestaurantDetails) {
  return [
    { icon: DEFAULT_ICON, text: restaurant.foodType },
    { icon: CandleIcon, text: restaurant.placeType },
  ].filter(tag => tag.text);
}

export const RestaurantInfo = ({ restaurant }: RestaurantInfoProps) => {
  const tags = buildTags(restaurant);
  const photos = restaurant.photos.map(uri => ({ uri }));
  const description =
    restaurant.description ?? 'Descrição não disponível para este restaurante.';

  return (
    <View className="flex gap-12">
      <View className="flew flex-col gap-4">
        <Typography
          type="span"
          className="text-lg text-[#5E5959] font-poppins-medium"
          text="Descrição"
        />

        <Typography
          type="p"
          className="text-justify text-[#5E5959]"
          text={description}
        />
      </View>

      <View className="flex flex-row w-full flex-wrap gap-2">
        {tags.map((tag, index) => (
          <Tag.Root key={index}>
            <tag.icon />
            <Tag.Title text={tag.text} />
          </Tag.Root>
        ))}
      </View>

      {photos.length > 0 && <PhotoGallery photos={photos} />}

      <View className="flex gap-2">
        <Typography
          type="span"
          className="text-lg text-[#5E5959] font-poppins-medium"
          text="Métodos de pagamento"
        />

        <View className="flex flex-row w-full gap-2">
          <VisaIcon width={40} height={40} />
          <MastercardIcon width={40} height={40} />
          <EloIcon width={40} height={40} />
          <SodexoIcon width={40} height={40} />
        </View>
      </View>

      <View className="flex gap-2">
        <Typography
          type="span"
          className="text-lg text-[#5E5959] font-poppins-medium"
          text="Horário de funcionamento"
        />

        <View className="flex flex-col w-full gap-2">
          <Typography
            type="span"
            className="text-[#5E5959]"
            text="Terça à quinta: 11:00 - 23:00"
          />
          <Typography
            type="span"
            className="text-[#5E5959]"
            text="Sexta à domingo: 11:00 - 01:00"
          />
        </View>
      </View>

      <View className="flex flex-col">
        <Typography
          type="span"
          className="text-lg text-[#5E5959] font-poppins-medium"
          text="Necessita reserva?"
        />

        <Typography type="span" className="text-[#5E5959]" text="Não" />
      </View>

      <View className="flex flex-col">
        <Typography
          type="span"
          className="text-lg text-[#5E5959] font-poppins-medium"
          text="Aceita delivery?"
        />

        <Typography type="span" className="text-[#5E5959]" text="Sim" />
      </View>
    </View>
  );
};
