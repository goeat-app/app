import { twMerge } from "lib/utils/twMerge"
import { TitleProps } from "./title.types"
import { Typography } from "@/components/typography/typography"

export const Title = ({ className, text, ...props }: TitleProps) => {
  return (
    <Typography
      type="span"
      className={twMerge("text-xs text-[#FFF]", className)} 
      text={text}
      {...props}
    />
  )
}