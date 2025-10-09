import { Button } from "@/components/button";
import { Typography } from "@/components/typography/typography";
import { twMerge } from "lib/utils/twMerge";
import { Image, Text, View } from "react-native";
import { useStepOneModel } from "./step-one.model";

export default function StepOne () {
  const {  progress, selectedItem, handleSelect, foodItems } = useStepOneModel();
  
  return (
    <View className='flex flex-col w-full h-full items-center justify-between p-4 bg-[#FDF6F5]'>
      <View className="w-full h-2 bg-[#FFC8A6FF] rounded-full mt-2 mb-6 ">
        <View
          className={twMerge('h-2 bg-[#FF7A00] rounded-full', `w-${progress * 100}%`)}
          style={{ width: `${progress * 100}%` }}
        />
      </View>

      <View className='flex w-full gap-10'>
        <View className='gap-1'>
          <Typography 
            className='text-[#00141C] text-lg font-poppins-semi-bold' 
            type='h1' 
            text='Personalize sua experiência'
          />
          <Typography 
            className='text-[#828282] text-base break-words' 
            type='p' 
            text='Conta pra gente o que você mais gosta de comer e nós mostramos os lugares perfeitos pra você.'
          />
        </View>

        <Typography 
          className='text-[#828282] text-base' 
          type='span' 
          text='Escolha  até 3 opções'
        />
      </View>

      <View className="flex-row flex-wrap gap-2 justify-center">
        {foodItems?.map(( item ) => (
          <Button 
            key={item.id} 
            className={twMerge('flex flex-col items-center justify-center w-[30%] h-[100px]', selectedItem.includes(item.id) ? 'bg-[#FBDD9C]' : '')}
            onPress={() => handleSelect(item.id)}
          >
            <Image className='w-[85%]' resizeMode='contain' source={item.image} />
            <Typography 
              className='text-[#00141C] font-poppins-medium' 
              type='small' 
              text={item.label} 
            />
          </Button>
        ))}
      </View>

      <View>
        <Button className="flex items-center justify-center w-[314px] h-[50px] bg-[#FF6B35] data-[pressed]:bg-[#e85a28]">
          <Typography type='h5' className='font-poppins-semi-bold text-[#F3F3F3]' text='Próximo' />
        </Button>
      </View>
    </View>
  )
}