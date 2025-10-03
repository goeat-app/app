import { View } from "react-native"
import { RootProps } from "../input.types"
import { twMerge } from "lib/utils/twMerge"

export const Root = ({ children, className, ...props }: RootProps) => {
  return (
    <View className={twMerge("flex rounded-[8px]", className)} {...props}>
      {children}
    </View>
  )
}