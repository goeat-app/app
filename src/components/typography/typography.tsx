import { Text } from 'react-native';

import { twMerge } from 'lib/utils/twMerge';

import { ITextProps, tag } from './typography.types';

export const Typography = ({ type, text, className, ...props }: ITextProps) => {
  return (
    <Text className={twMerge(`${tag[type]}`, className)} {...props}>
      {text}
    </Text>
  );
};
