import { ViewProps } from "react-native"

export type RootProps = ViewProps & {
  children?: React.ReactNode;
  className?: string;
};
