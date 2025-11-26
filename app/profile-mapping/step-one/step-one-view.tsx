import { Image, ScrollView, View } from 'react-native';

import { router } from 'expo-router';
import { twMerge } from 'lib/utils/twMerge';

import { Button } from '@/components/button';
import { Typography } from '@/components/typography/typography';
import { getImageSource } from '@/lib/utils/image-mapper';

import { useStepOneModel } from './step-one.model';

export default function StepOne() {
  const {
    progress,
    selectedItem,
    handleSelect,
    foodCategories,
    isMaxSelected,
    setSelectedFoodCategories,
  } = useStepOneModel();

  return (
    <View className="flex flex-col w-full h-full items-center justify-between p-8 bg-[#FDF6F5]">
      <ScrollView
        contentContainerStyle={{ gap: 24 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="w-full h-2 bg-[#FFC8A6FF] rounded-full mt-2 mb-6 ">
          <View
            className={twMerge(
              'h-2 bg-[#FF7A00] rounded-full',
              `w-${progress * 100}%`,
            )}
            style={{ width: `${progress * 100}%` }}
          />
        </View>

        <View className="flex w-full gap-10">
          <View className="gap-1">
            <Typography
              className="text-[#00141C] text-lg font-poppins-semi-bold"
              type="h5"
              text="Personalize sua experiência"
            />
            <Typography
              className="text-[#828282] text-base break-words"
              type="p"
              text="Conta pra gente o que você mais gosta de comer e nós mostramos os lugares perfeitos pra você."
            />
          </View>

          <Typography
            className="text-[#828282] text-base"
            type="span"
            text="Escolha até 3 opções"
          />
        </View>

        <View className="flex-row flex-wrap gap-2 justify-center">
          {foodCategories?.map(item => {
            const isSelected = selectedItem.includes(item.id);
            const isDisabled = isMaxSelected && !isSelected;

            return (
              <Button
                key={item.id}
                className={twMerge(
                  'flex flex-col items-center justify-center w-[30%] h-[100px]',
                  isSelected ? 'bg-[#FBDD9C]' : '',
                  isDisabled ? 'opacity-50' : '',
                )}
                onPress={() => handleSelect(item.id)}
                disabled={isDisabled}
              >
                <Image
                  className="w-[85%]"
                  resizeMode="contain"
                  source={getImageSource(item.tagImage)}
                />
                <Typography
                  className="text-[#00141C] font-poppins-medium"
                  type="small"
                  text={item.name}
                />
              </Button>
            );
          })}
        </View>

        <Button
          onPress={() => {
            setSelectedFoodCategories(selectedItem);
            router.push('/profile-mapping/step-two/step-two-view');
          }}
          className="flex items-center justify-center w-full h-[50px] bg-[#FF6B35] data-[pressed]:bg-[#e85a28]"
        >
          <Typography
            type="h5"
            className="font-poppins-semi-bold text-[#F3F3F3]"
            text="Próximo"
          />
        </Button>
      </ScrollView>
    </View>
  );
}
