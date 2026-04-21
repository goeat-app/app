import { StarIcon } from '@/assets/icons/star-icon';
import { Button } from '@/components/button';
import { PhotoGallery } from '@/components/photo-gallery/photo-gallery';
import { RatingList } from '@/components/rating-list/rating-list';
import { Typography } from '@/components/typography/typography';
import { Image, ScrollView, View } from 'react-native';

export const RestaurantReviews = () => {
  //TODO: Remover dados mockados
  const reviews = [
    {
      name: 'Sarah Ofila',
      rating: 3,
      review: 'Ótima comida e atendimento!',
      date: 3,
      photos: [
        require('@/assets/images/photo-restaurant/mock-avaliacao-1.png'),
        require('@/assets/images/photo-restaurant/mock-avaliacao-2.png'),
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

  return (
    <View className="flex flex-row w-full gap-2">
      <View className="flex flex-col w-full">
        <View className="flex flex-row w-full justify-between items-center">
          <Typography
            type="span"
            className="text-lg text-[#5E5959] font-poppins-medium"
            text="Avaliações"
          />

          <Button className="flex">
            <Typography
              type="span"
              className="text-[10px] text-[#5E5959] underline"
              text="Ver todas"
            />
          </Button>
        </View>

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
    </View>
  );
};
