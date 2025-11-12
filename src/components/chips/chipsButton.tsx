import React from 'react';
import { Text, View, TouchableOpacity, TouchableOpacityProps } from "react-native";

type ChipButtonProps = {
  text: string;
  isSelected: boolean;
} & TouchableOpacityProps; 

export const ChipButton = ({ text, isSelected, ...props }: ChipButtonProps) => {
  return (
    <TouchableOpacity {...props}> 
      <View
        className={`
          border rounded-full py-2 px-5 mr-2
          ${isSelected ? 'bg-[#FF6B35] border-[#FF6B35]' : 'bg-transparent border-[#A2AFB6]'}
        `}
      >
        <Text
          className={`
            text-sm font-bold
            ${isSelected ? 'text-white' : 'text-[#003247]'}
          `}
        >
          {text}
        </Text>
      </View>
    </TouchableOpacity>
  );
}