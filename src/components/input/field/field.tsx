import { TextInput, View } from 'react-native';
import { twMerge } from 'lib/utils/twMerge';
import { ContentProps, FieldProps } from '../input.types';
import React from 'react';

const ContentLeft = ({ children, className }: ContentProps) => {
  return (
    <View className={twMerge('flex-shrink-0', className)}>{children}</View>
  );
};

const ContentRight = ({ children, className }: ContentProps) => {
  return (
    <View className={twMerge('flex-shrink-0', className)}>{children}</View>
  );
};

const Field = ({
  className,
  children,
  value,
  onChangeText,
  onBlur,
  ...props
}: FieldProps) => {
  const childrenArray = React.Children.toArray(children);

  const leftContent = childrenArray.find(
    (child: any) => child?.type === ContentLeft,
  );

  const rightContent = childrenArray.find(
    (child: any) => child?.type === ContentRight,
  );

  return (
    <View
      className={twMerge(
        'px-4 gap-4 flex flex-row items-center justify-between rounded-[8px] bg-[--bg-white-1]',
        className,
      )}
    >
      {leftContent}

      <TextInput
        className={twMerge(
          'flex-1 w-full h-full text-[#828282] font-poppins-medium outline-none',
        )}
        placeholderTextColor="#AAAAAA"
        value={value}
        onChangeText={onChangeText}
        onBlur={onBlur}
        {...props}
      />

      {rightContent}
    </View>
  );
};

export { Field, ContentLeft, ContentRight };
