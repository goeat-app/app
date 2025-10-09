import { twMerge } from "lib/utils/twMerge"
import { ITextProps } from "./typography.types"
import { Text } from "react-native"

export const Typography = ({ children, type, text, className, ...props }: ITextProps) => {
  const tag = {
    h1: 'text-4xl font-bold',
    h2: 'text-3xl font-bold',
    h3: 'text-2xl font-bold',
    h4: 'text-xl font-bold',
    h5: 'text-lg font-bold',
    h6: 'text-base font-bold',
    p: 'text-base',
    small: 'text-xs',
    span: 'text-base',
  }

  return (
    <Text className={twMerge(`${tag[type]}`, className)} {...props}>
      {text}
    </Text>
  )
}