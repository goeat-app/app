import { Pressable, View } from 'react-native';

import { Typography } from '../typography/typography';

type TabItemProps = {
  icon: React.ReactNode;
  label: string;
  onPress: () => void;
  isActive?: boolean;
};

export const TabItem = ({ label, icon, onPress, isActive }: TabItemProps) => {
  return (
    <Pressable
      onPress={onPress}
      className="flex-1 items-center justify-center py-1"
    >
      <View className="items-center gap-1">
        {icon}
        <Typography
          text={label}
          type="span"
          className={`text-xs ${isActive ? 'text-white font-poppins-semi-bold' : 'text-white/70 font-poppins-regular'}`}
        />
        {isActive && <View className="w-8 h-1 bg-white rounded-full" />}
      </View>
    </Pressable>
  );
};
