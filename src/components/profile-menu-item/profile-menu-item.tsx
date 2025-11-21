import { Pressable, View } from 'react-native';

import { EnterPageIcon } from '@/assets/icons/acess-page-icon';
import { Typography } from '@/components/typography/typography';

type ProfileMenuItemProps = {
  text: string;
  icon: React.ReactNode;
  onPress?: () => void;
};

export function ProfileMenuItem({ text, icon, onPress }: ProfileMenuItemProps) {
  return (
    <Pressable
      onPress={onPress}
      className="flex-row items-center justify-between w-full"
    >
      <View className="flex-row items-center gap-4">
        {icon}

        <Typography
          type="h5"
          className="text-[#003247] font-poppins-medium"
          text={text}
        />
      </View>

      <EnterPageIcon width={16} height={16} />
    </Pressable>
  );
}
