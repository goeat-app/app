import { CashIcon } from '@/assets/icons/cash-icon';
import { MoneyIconProps } from './money-icon.types';
import { View } from 'react-native';

export const MoneyIcon = ({ scale, width, height, color }: MoneyIconProps) => {
  const iconFilled = color ?? '#003247';

  const iconProps = {
    width: width ?? 16,
    height: height ?? width ?? 20,
  };

  const renderItem = (index: number) => {
    const isFilled = index < scale;
    return (
      <CashIcon
        key={index}
        color={isFilled ? iconFilled : '#C2C2C2'}
        {...iconProps}
      />
    );
  };

  return (
    <View className="flex flex-row">
      {Array.from({ length: 5 }).map((_, index) => renderItem(index))}
    </View>
  );
};
