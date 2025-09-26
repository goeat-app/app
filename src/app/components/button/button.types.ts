import { PressableProps } from "react-native";

type ButtonProps = PressableProps & {
  children?: React.ReactNode;
  className?: string;
}

export {
  ButtonProps
}