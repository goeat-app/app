import { TextInputProps, ViewProps } from "react-native";

type RootProps = ViewProps & {
  children?: React.ReactNode;
  className?: string;
};

type FieldProps = TextInputProps & {
  children?: React.ReactNode;
};

type IndicatorProps = RootProps;

type LabelProps = {
  text: string;
  className?: string;
}

export { FieldProps, IndicatorProps, LabelProps, RootProps };
