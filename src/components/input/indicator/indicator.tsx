import { View } from 'react-native';

import { twMerge } from 'lib/utils/twMerge';

import { IndicatorProps } from '../input.types';

export const Indicator = ({
  children,
  className,
  ...props
}: IndicatorProps) => {
  return (
    <View className={twMerge(className)} {...props}>
      {children}
    </View>
  );
};
