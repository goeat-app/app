import { twMerge } from 'lib/utils/twMerge';
import { ITextProps } from './typography.types';
import { Text } from 'react-native';

export const Typography = ({
  children,
  type,
  text,
  className,
  ...props
}: ITextProps) => {
  const tag = {
    h1: 'text-4xl',
    h2: 'text-3xl',
    h3: 'text-2xl',
    h4: 'text-xl',
    h5: 'text-lg',
    h6: 'text-base',
    p: 'text-base',
    small: 'text-xs',
    span: 'text-base',
  };

  return (
    <Text className={twMerge(`${tag[type]}`, className)} {...props}>
      {text}
    </Text>
  );
};
