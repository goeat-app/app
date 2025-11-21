import { TextInputProps, ViewProps } from 'react-native';

type RootProps = ViewProps & {
  children?: React.ReactNode;
  className?: string;
};

type FieldProps = TextInputProps & {
  children?: React.ReactNode;
  onChangeText?: (text: string) => void;
};

type IndicatorProps = RootProps;

type LabelProps = {
  text: string;
  className?: string;
};

type ContentProps = {
  children: React.ReactNode;
  className?: string;
};

export { ContentProps, FieldProps, IndicatorProps, LabelProps, RootProps };
