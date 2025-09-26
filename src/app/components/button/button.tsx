import { twMerge } from "lib/utils/twMerge"
import { Pressable } from "react-native"
import { ButtonProps } from "./button.types"

export const Button = ({ children, className, ...props }: ButtonProps) => {
  return (
    <Pressable className={twMerge("font-poppins-medium text-center rounded-[15px]", className)} {...props}>
      {children}
    </Pressable>
  )
}