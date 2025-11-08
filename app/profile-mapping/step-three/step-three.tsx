import { Typography } from '@/components/typography/typography';
import { Keyboard, TouchableWithoutFeedback, View } from 'react-native';
import { Text } from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { Input } from '@/components/input';
import { Button } from '@/components/button';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useStepThreeModel } from './step-three.model';
import React from 'react';
import { router } from 'expo-router';

export default function StepThree() {
  const {
    range,
    handleSliderChange,
    formatCurrency,
    minInput,
    maxInput,
    handleChangePrice,
    handleBlur,
  } = useStepThreeModel();

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="always"
      showsVerticalScrollIndicator={false}
      enableOnAndroid={true}
      extraScrollHeight={100}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="flex flex-col w-full h-full items-center justify-between p-8 bg-[#FDF6F5]">
          <View className="w-full h-2 bg-[#FFC8A6FF] rounded-full mt-2 mb-6 ">
            <View className="h-2 bg-[#FF7A00] rounded-full w-[100%]" />
          </View>

          <View className="flex items-start gap-10">
            <View className="gap-1">
              <Typography
                type="h5"
                className="font-poppins-semi-bold"
                text="Qual é a sua média de gastos quando sai para comer ou beber?"
              />

              <Typography
                className="text-[#828282] text-base break-words"
                type="p"
                text="Isso nos ajuda a ajustar as recomendações de restaurantes, bares e cafeterias ao seu perfil."
              />
            </View>

            <Typography
              className="text-[#828282] text-base"
              type="span"
              text="Ajuste a faixa de gastos"
            />
          </View>

          <View className="p-20  flex items-center gap-4">
            <MultiSlider
              values={range}
              onValuesChange={handleSliderChange}
              min={20}
              max={300}
              step={10}
              sliderLength={250}
              selectedStyle={{
                backgroundColor: '#FF7A00',
                height: 8,
                borderRadius: 5,
                marginTop: 16,
              }}
              unselectedStyle={{
                backgroundColor: '#FFC8A6',
                height: 8,
                borderRadius: 5,
                marginTop: 16,
              }}
              customMarker={e => (
                <View style={{ alignItems: 'center' }}>
                  <View className="flex items-center justify-center bg-[#FF7A00] w-12 h-10 rounded-md">
                    <Text className="text-white font-bold text-xs">
                      {formatCurrency(e.currentValue.toString())}
                    </Text>
                  </View>

                  <View
                    style={{
                      width: 0,
                      height: 0,
                      borderLeftWidth: 12,
                      borderRightWidth: 12,
                      borderTopWidth: 12,
                      borderLeftColor: 'transparent',
                      borderRightColor: 'transparent',
                      borderTopColor: '#FF7A00',
                      marginTop: -1,
                    }}
                  />

                  <View className="h-7 w-7 rounded-full bg-[#FF7A00] border-4 border-white mt-1" />
                </View>
              )}
            />

            <View className="w-[250px] flex flex-row justify-between">
              <Input.Root>
                <Input.Field
                  value={formatCurrency(minInput)}
                  onChangeText={value => handleChangePrice(value, 'min')}
                  onBlur={() => handleBlur('min')}
                  keyboardType="numeric"
                  className="w-[90px] h-[45px] border border-[#8B8B8B] bg-transparent"
                />
                <Input.Label text="Mínimo" className="mb-1 text-[#00141C]" />
              </Input.Root>

              <Input.Root>
                <Input.Field
                  onChangeText={value => handleChangePrice(value, 'max')}
                  onBlur={() => handleBlur('max')}
                  value={formatCurrency(maxInput)}
                  keyboardType="numeric"
                  className="w-[90px] h-[45px] border rounded-xl border-[#8B8B8B] bg-transparent"
                />
                <Input.Label text="Máximo" className="mb-1 text-[#00141C]" />
              </Input.Root>
            </View>
          </View>

          <View className="w-full">
            <Button
              onPress={() => router.push('/recomendations/recomendations')}
              className="flex items-center justify-center  h-[50px] bg-[#FF6B35] data-[pressed]:bg-[#e85a28]"
            >
              <Typography
                type="h5"
                className="font-poppins-semi-bold text-[#F3F3F3]"
                text="Finalizar"
              />
            </Button>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAwareScrollView>
  );
}
