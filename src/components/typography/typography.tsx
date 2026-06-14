import { Text } from 'react-native';

import { twMerge } from 'lib/utils/twMerge';

import { tag } from './constants';
import { ITextProps } from './typography.types';

export const Typography = ({
  children: _children,
  type,
  text,
  className,
  ...props
}: ITextProps) => {
  return (
    <Text className={twMerge(`${tag[type]}`, className)} {...props}>
      {text}
    </Text>
  );
};
