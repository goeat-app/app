import { twMerge } from "lib/utils/twMerge"
import { Text } from "react-native"
import { LabelProps } from "../input.types"

export const Label = ({ text, className }: LabelProps) => {
  return (
    <Text className={twMerge('font-poppins-medium text-[14px] text-[#797777] font-medium', className)}>
      {text}
    </Text>
  )
}