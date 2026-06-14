import { View } from 'react-native';

import { twMerge } from 'lib/utils/twMerge';

import { RootProps } from '../input.types';

export const Root = ({ children, className, ...props }: RootProps) => {
  return (
    <View className={twMerge('flex rounded-[8px]', className)} {...props}>
      {children}
    </View>
  );
};
