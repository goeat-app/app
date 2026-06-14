import { Pressable } from 'react-native';

import { twMerge } from 'lib/utils/twMerge';

import { ButtonProps } from './button.types';

export const Button = ({ children, className, ...props }: ButtonProps) => {
  return (
    <Pressable
      className={twMerge(
        'font-poppins-medium text-center rounded-[16px]',
        className,
      )}
      {...props}
    >
      {children}
    </Pressable>
  );
};
