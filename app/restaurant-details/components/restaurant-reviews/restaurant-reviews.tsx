import { Image, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { router } from 'expo-router';
import { twMerge } from 'tailwind-merge';

import { StarIcon } from '@/assets/icons/star-icon';
import { Button } from '@/components/button';
import { RatingList } from '@/components/rating-list/rating-list';
import { Typography } from '@/components/typography/typography';

export const RestaurantReviews = () => {
  //TODO: Remover dados mockados
  const reviews = [
    {
      name: 'Sarah Ofila',
      rating: 3,
      review: 'Ótima comida mas atendimento nem tanto...',
      date: 3,
      photos: [
        require('@/assets/images/photo-restaurant/mock-avaliacao-1.png'),
        require('@/assets/images/photo-restaurant/mock-avaliacao-3.png'),
      ],
    },
    {
      name: 'James Atite',
      rating: 5,
      review: 'Ótima comida e atendimento!',
      date: 1,
      photos: [
        require('@/assets/images/photo-restaurant/mock-avaliacao-1.png'),
        require('@/assets/images/photo-restaurant/mock-avaliacao-2.png'),
        require('@/assets/images/photo-restaurant/mock-avaliacao-3.png'),
      ],
    },
  ];

  const BAR_REVIEW = 0.9;

  return (
    <View className="flex flex-col w-full items-center justify-center gap-2">
      <Typography
        type="span"
        className="text-[20px] text-[#003247] font-poppins-medium"
        text="Avaliações"
      />

      <View className="flex flex-row w-[340px] h-[200px] bg-[#FFECD3] rounded-xl gap-2">
        <View className="flex w-[70%] p-2">
          {/* TODO: Integrar e criar lógica para avaliações */}
          <View className="flex flex-row items-center gap-1 p-2">
            <StarIcon width={12} height={12} color="#E86D17" />
            <Typography type="span" text="5" />
            <View
              className={twMerge(
                'h-2 bg-[#FF7A00] rounded-full',
                `w-${BAR_REVIEW * 100}%`,
              )}
              style={{ width: `${BAR_REVIEW * 100}%` }}
            />
          </View>

          <View className="flex flex-row  items-center gap-1 p-2">
            <StarIcon width={12} height={12} color="#E86D17" />
            <Typography type="span" text="4" />
            <View
              className={twMerge(
                'h-2 bg-[#FF7A00] rounded-full',
                `w-${0.55 * 100}%`,
              )}
              style={{ width: `${0.55 * 100}%` }}
            />
          </View>

          <View className="flex flex-row items-center gap-1 p-2">
            <StarIcon width={12} height={12} color="#E86D17" />
            <Typography type="span" text="3" />
            <View
              className={twMerge(
                'h-2 bg-[#FF7A00] rounded-full',
                `w-${0.35 * 100}%`,
              )}
              style={{ width: `${0.35 * 100}%` }}
            />
          </View>

          <View className="flex flex-row items-center gap-1 p-2">
            <StarIcon width={12} height={12} color="#E86D17" />
            <Typography type="span" text="2" />
            <View
              className={twMerge(
                'h-2 bg-[#FF7A00] rounded-full',
                `w-${0.25 * 100}%`,
              )}
              style={{ width: `${0.25 * 100}%` }}
            />
          </View>

          <View className="flex flex-row items-center gap-1 p-2">
            <StarIcon width={12} height={12} color="#E86D17" />
            <Typography type="span" text="1" />
            <View
              className={twMerge(
                'h-2 bg-[#FF7A00] rounded-full',
                `w-${0.1 * 100}%`,
              )}
              style={{ width: `${0.1 * 100}%` }}
            />
          </View>
        </View>

        <View className="flex w-full p-2 justify-center">
          <Typography
            type="span"
            text="4.1"
            className="font-plus-jakarta-semi-bold text-4xl"
          />

          <Typography
            type="span"
            text="52 reviews"
            className="font-plus-jakarta-sans text-md"
          />
        </View>
      </View>

      <Button
        onPress={() => router.push('/reviews/reviews')}
        className="flex items-center justify-center w-full h-[50px] bg-[#FF6B35]"
      >
        <Typography
          type="span"
          text="Avaliar Restaurante"
          className="font-poppins-semi-bold text-xl color-[#fff]"
        />
      </Button>

      {reviews?.map(review => (
        <ScrollView key={review.name} className="flex flex-col gap-2">
          <View className="flex flex-col gap-2">
            <View className="w-full border-b border-[#5E5959] py-2" />
            <View className="flex flex-row w-full items-center justify-between">
              <RatingList
                value={review.rating}
                Icon={StarIcon}
                filledColor="#FF6B35"
                size={12}
              />

              <Typography
                type="span"
                className="text-[10px] text-[#5E5959]"
                text={`${review.date} ${review.date === 1 ? 'mês' : 'meses'} atrás`}
              />
            </View>

            <View className="flex flex-col gap-4">
              <View>
                <Typography
                  type="span"
                  className="text-[12px] text-[#0F0C0C] font-poppins-medium break-words"
                  text={review.name}
                />
                <Typography
                  type="span"
                  className="text-[12px] text-[#5E5959]  break-words"
                  text={review.review}
                />
              </View>

              <View className="flex flex-row w-full flex-wrap">
                {review.photos?.map((photo, index) => (
                  <Image
                    resizeMode="contain"
                    source={photo}
                    className=" m-1"
                    key={index}
                  />
                ))}
              </View>
            </View>
          </View>
        </ScrollView>
      ))}
    </View>
  );
};
