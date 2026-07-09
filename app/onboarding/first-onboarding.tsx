import { useState, useRef, useEffect } from 'react';
import {
  View,
  Image,
  Pressable,
  ScrollView,
  useWindowDimensions,
  ImageSourcePropType,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';

import { router } from 'expo-router';

import { Button } from '@/components/button';
import { Typography } from '@/components/typography/typography';
import {
  setOnboardingCompleted,
  hasCompletedOnboarding,
} from '@/lib/storage/onboarding-storage';
import { FlatList } from 'react-native-gesture-handler';

type OnboardingStep = {
  id: string;
  image: ImageSourcePropType | undefined;
  title: string;
  description: string;
};

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

function OnBoardingItem({
  item,
  width,
}: {
  item: OnboardingStep;
  width: number;
}) {
  return (
    <View
      className="items-center justify-center gap-4 px-4"
      style={{ height: '100%', width: width }}
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

export default function OnBoardingCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  const FlatListRef = useRef<FlatList<OnboardingStep>>(null);

  const { width } = useWindowDimensions();

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      const completed = await hasCompletedOnboarding();
      if (completed) {
        router.replace('/home/home');
      }
    };

    checkOnboardingStatus();
  }, []);

  const handleSkip = async () => {
    await setOnboardingCompleted();
    router.push('/signin/signin-view');
  };

  function handleScrollEnd(event: NativeSyntheticEvent<NativeScrollEvent>) {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / width);
    setActiveIndex(index);
  }

  const handleNext = async () => {
    const nextIndex = Math.min(activeIndex + 1, onboardingSteps.length - 1);
    if (activeIndex === onboardingSteps.length - 1) {
      await setOnboardingCompleted();
      router.push('/signin/signin-view');
      return;
    }

    FlatListRef.current?.scrollToIndex({
      index: nextIndex,
      animated: true,
    });

    setActiveIndex(nextIndex);
  };

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: Array<{ index: number | null }> }) => {
      if (viewableItems.length > 0) {
        setActiveIndex(
          viewableItems[0].index !== null ? viewableItems[0].index : 0,
        );
      }
    },
  ).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  return (
    <View className="flex-1 bg-[#FDF6F5]">
      <View className="flex-1 items-center justify-center">
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
          onMomentumScrollEnd={handleScrollEnd}
          getItemLayout={(_, index) => ({
            length: width,
            offset: width * index,
            index,
          })}
        />
      </View>
      <View className="w-full gap-6 px-4 justify-center">
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
              <Pressable
                key={index}
                onPress={() => FlatListRef.current?.scrollToIndex({ index })}
              >
                <View
                  className={`w-3 h-3 rounded-full ${
                    index === activeIndex ? 'bg-[#FF6B35]' : 'bg-[#D9D9D9]'
                  }`}
                />
              </Pressable>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
}
