import { View } from "react-native"
import { twMerge } from "lib/utils/twMerge"
import { RootProps } from "./root.types"

export const Root = ({ children, className, ...props }: RootProps) => {
  return (
    <View className={twMerge("flex flex-row items-center justify-center w-[75px] h-[25px] bg-[#FF6B35] rounded-[5px] gap-2", className)} {...props}>
      {children}
    </View>
  )
}