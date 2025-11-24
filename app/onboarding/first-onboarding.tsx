import { router } from 'expo-router';
import { Button } from '@/components/button';
import { Typography } from '@/components/typography/typography';
import {
  View,
  Image,
  Pressable,
  FlatList,
  useWindowDimensions,
} from 'react-native';
import { useState, useRef } from 'react';

export default function OnBoardingCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const FlatListRef = useRef(null);
  const { width } = useWindowDimensions();

  const onboardingSteps = [
    {
      id: '1',
      image: require('@/assets/images/goat-foods.png'),
      title: 'Quer descobrir um restaurante perfeito para você?',
      description:
        'Com o Goeat você descobre restaurantes que são exatamente o que você quer',
    },
    {
      id: '2',
      image: require('@/assets/images/goat-phone.png'),
      title: 'Como a mágica acontece?',
      description:
        'Usamos seu perfil, os lugares que você curte e o que pessoas como você gostam para achar seu próximo restaurante favorito',
    },
  ];

  function OnBoardingItem({ item, width }) {
    return (
      <View
        className="items-center justify-center gap-4 px-4"
        style={{ width: width, height: '100%' }}
      >
        <View className="flex-3 justify-end items-center">
          <Image
            resizeMode="contain"
            source={item.image}
            style={{
              width: 320,
              height: 320,
            }}
          />
        </View>

        <View className="flex-2 justify-start items-center">
          <View className="w-full items-center gap-2">
            <Typography
              type="h3"
              className="text-[#FF6B35] font-poppins-semi-bold text-center"
              text={item.title}
              numberOfLines={2}
              adjustsFontSizeToFit={true}
            />
            <Typography
              type="span"
              className="text-[#797777] font-poppins-medium text-center"
              text={item.description}
            />
          </View>
        </View>
      </View>
    );
  }

  const handleSkip = () => {
    router.push('/signin/signin-view');
  };

  const handleNext = () => {
    const nextIndex = activeIndex + 1;
    if (nextIndex >= onboardingSteps.length) {
      router.push('/signin/signin-view');
    } else {
      FlatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
    }
  };

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveIndex(viewableItems[0].index);
    }
  }).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  return (
    <View className="flex-1 bg-[#FDF6F5]">
      <View className="flex-4 items-center justify-center">
        <FlatList
          ref={FlatListRef}
          data={onboardingSteps}
          renderItem={({ item }) => (
            <OnBoardingItem item={item} width={width} />
          )}
          keyExtractor={item => item.id}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          bounces={false}
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={viewabilityConfig}
          style={{ width: width }}
          contentContainerStyle={{ alignItems: 'center' }}
        />
      </View>
      <View className="flex-1 w-full gap-6 px-4 justify-center">
        <Button
          onPress={handleNext}
          className="w-full h-[50px] bg-[#FF6B35] data-[pressed]:bg-[#e85a28] flex items-center justify-center rounded-xl"
        >
          <Typography
            type="h5"
            className="text-[#F3F3F3] font-semibold"
            text={
              activeIndex === onboardingSteps.length - 1 ? 'Começar' : 'Próximo'
            }
          />
        </Button>

        <View className="flex-row items-center justify-between">
          <Pressable onPress={handleSkip}>
            <Typography
              type="p"
              className="font-poppins-medium text-[#797777]"
              text="Pular"
            />
          </Pressable>

          <View className="flex-row gap-2">
            {onboardingSteps.map((_, index) => (
              <View
                key={index}
                className={`w-3 h-3 rounded-full ${
                  index === activeIndex ? 'bg-[#FF6B35]' : 'bg-[#D9D9D9]'
                }`}
              />
            ))}
          </View>
        </View>
      </View>
    </View>
  );
}
