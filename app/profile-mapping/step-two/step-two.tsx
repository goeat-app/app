import { Button } from '@/components/button';
import { Typography } from '@/components/typography/typography';
import { twMerge } from '@/lib/utils/twMerge';
import { ImageBackground, ScrollView, View } from 'react-native';
import { useStepTwoModel } from './step-two.model';
import { LinearGradient } from 'expo-linear-gradient';
import { CheckIcon } from '@/assets/icons/check-icon';
import { enviromentItems } from '@/lib/mocks/step-two-mock';
import { router } from 'expo-router';

export default function StepTwo() {
  const { progress, handleSelectEnvironment, selectedEnvironment } =
    useStepTwoModel();

  return (
    <View className="flex flex-col w-full h-full items-center justify-between gap-4 p-8 bg-[#FDF6F5]">
      <View className="w-full h-2 bg-[#FFC8A6FF] rounded-full mt-2 mb-6 ">
        <View
          className={twMerge(
            'h-2 bg-[#FF7A00] rounded-full',
            `w-${progress * 100}%`,
          )}
          style={{ width: `${progress * 100}%` }}
        />
      </View>

      <View className="flex items-start gap-10">
        <View className="gap-1">
          <Typography
            type="h5"
            className="font-poppins-semi-bold"
            text="Qual tipo de ambiente costuma frequentar?"
          />

          <Typography
            className="text-[#828282] text-base break-words"
            type="p"
            text="Cada pessoa tem seu lugar favorito. Conta pra gente quais são os seus"
          />
        </View>

        <Typography
          className="text-[#828282] text-base"
          type="span"
          text="Escolha até 3 opções"
        />
      </View>

      <ScrollView
        style={{ flexGrow: 1, gap: 24 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-row flex-wrap gap-2 justify-center items-center">
          {enviromentItems?.map(item => (
            <Button
              key={item.id}
              className={twMerge(
                'flex items-center justify-center w-[48%] h-[110px]',
                selectedEnvironment.includes(item.id)
                  ? 'border-4 border-[#FF724C]'
                  : 'border border-transparent',
              )}
              style={{ overflow: 'hidden', borderRadius: 12 }}
              onPress={() => handleSelectEnvironment(item.id)}
            >
              <ImageBackground className="w-full" source={item.image}>
                <LinearGradient
                  colors={[
                    'rgba(0, 0, 0, 0.3)',
                    'rgba(0, 0, 0, 0.5)',
                    'rgba(0, 0, 0, 0.7)',
                  ]}
                  className="w-full h-full justify-center"
                  locations={[0, 0.5, 1]}
                >
                  <Typography
                    type="h5"
                    className="font-poppins-semi-bold text-white p-2"
                    text={item.label}
                  />
                  {selectedEnvironment.includes(item.id) && (
                    <View className="absolute right-2 p-1">
                      <CheckIcon color="#FF724C" width={20} height={20} />
                    </View>
                  )}
                </LinearGradient>
              </ImageBackground>
            </Button>
          ))}
        </View>
      </ScrollView>

      <View className="w-full">
        <Button
          onPress={() => router.push('/profile-mapping/step-three/step-three')}
          className="flex items-center justify-center  h-[50px] bg-[#FF6B35] data-[pressed]:bg-[#e85a28]"
        >
          <Typography
            type="h5"
            className="font-poppins-semi-bold text-[#F3F3F3]"
            text="Próximo"
          />
        </Button>
      </View>
    </View>
  );
}
