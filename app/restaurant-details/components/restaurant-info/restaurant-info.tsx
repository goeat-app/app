import { CandleIcon } from '@/assets/icons/env-type/candle-icon';
import { GlassIcon } from '@/assets/icons/env-type/glass-icon';
import { ModernPlaceIcon } from '@/assets/icons/env-type/modern-place-icon';
import { NatureVeganIcon } from '@/assets/icons/env-type/nature-vegan-icon';
import { EloIcon } from '@/assets/icons/payment-methods/elo-icon';
import { MastercardIcon } from '@/assets/icons/payment-methods/mastercard-icon';
import { SodexoIcon } from '@/assets/icons/payment-methods/sodexo-icon';
import { VisaIcon } from '@/assets/icons/payment-methods/visa-icon';
import { PhotoGallery } from '@/components/photo-gallery/photo-gallery';
import { Tag } from '@/components/tag';
import { Typography } from '@/components/typography/typography';
import { View } from 'react-native';

export const RestaurantInfo = () => {
  //TODO: Remover dados mockados
  const tags = [
    {
      icon: CandleIcon,
      text: 'Intimista',
    },
    {
      icon: NatureVeganIcon,
      text: 'Vegano',
    },
    {
      icon: GlassIcon,
      text: 'Drinks',
    },
    {
      icon: ModernPlaceIcon,
      text: 'Moderno',
    },
  ];

  //TODO: Remover dados mockados
  const photos = [
    require('@/assets/images/photo-restaurant/photo-restaurant-mock-1.png'),
    require('@/assets/images/photo-restaurant/photo-restaurant-mock-2.png'),
    require('@/assets/images/photo-restaurant/photo-restaurant-mock-3.png'),
    require('@/assets/images/photo-restaurant/restaurant-mock-1.png'),
  ];

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
          text="Nosso restaurante oferece um ambiente aconchegante, com iluminação suave e decoração charmosa, ideal para momentos especiais. O cardápio traz sabores caseiros com um toque especial, sempre preparados com ingredientes frescos. Aqui, cada detalhe é pensado para que você se sinta em casa e viva uma experiência gastronômica única."
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

      {/* Galeria de fotos */}
      <PhotoGallery photos={photos} />

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
