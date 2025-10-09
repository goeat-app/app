import { TextProps } from "react-native";

export type ITextProps = TextProps & {
  text: string;
  type: string;
  className?: string;
}