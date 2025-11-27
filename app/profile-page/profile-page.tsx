import { View, Image, TouchableOpacity } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

import { ExitIcon } from '@/assets/icons/exit-icon';
import { PhoneIcon } from '@/assets/icons/phone-icon';
import { PlacesVisitedIcon } from '@/assets/icons/places-icon';
import { SettingsIcon } from '@/assets/icons/settings-icon';
import { StarFeedbackIcon } from '@/assets/icons/star-feedback-icon';
import { Button } from '@/components/button';
import { ProfileMenuItem } from '@/components/profile-menu-item/profile-menu-item';
import { Typography } from '@/components/typography/typography';

import { useProfilePageModel } from './profile-page.model';

export default function ProfilePage() {
  const {
    headerHeight,
    avatarHalfSize,
    navigateEditProfile,
    navigatePreferences,
    navigatePlaces,
    navigateFeedback,
    navigateFaq,
    logout,
  } = useProfilePageModel();

  return (
    <View className="flex-1 bg-[#FF6B35]">
      <View
        style={{ height: headerHeight }}
        className="justify-start pt-4 px-4"
      >
        <TouchableOpacity onPress={() => router.back()} className="self-start">
          <Ionicons
            name="arrow-back-circle-outline"
            size={42}
            color="#FFFAF9"
          />
        </TouchableOpacity>
      </View>
      <View className="flex-1 bg-[#FFFAF9] rounded-t-3xl">
        <View className="items-center gap-4 flex-1">
          <Image
            className="w-32 h-32 rounded-full border-4 border-white"
            source={require('@/assets/images/avatar.png')}
            style={{
              marginTop: -avatarHalfSize,
            }}
          />

          <View className="items-center gap-1">
            <Typography
              type="h2"
              className="text-[#003247] font-poppins-medium text-center"
              text="Fulano de tal"
            />
            <TouchableOpacity>
              <Typography
                type="h5"
                className="text-[#5F6368] font-poppins-regular text-center underline underline-offset-2"
                text="Editar perfil"
                onPress={navigateEditProfile}
              />
            </TouchableOpacity>
          </View>
          <View className="w-full px-4 gap-4 flex-1">
            <View className="flex-1" />
            <View className="gap-4">
              <ProfileMenuItem
                icon={<SettingsIcon width={24} height={24} color="#003247" />}
                text="Redefinir preferências"
                onPress={navigatePreferences}
              />
              <ProfileMenuItem
                icon={
                  <PlacesVisitedIcon width={23} height={24} color="#003247" />
                }
                text="Lugares visitados"
                onPress={navigatePlaces}
              />
              <ProfileMenuItem
                icon={
                  <StarFeedbackIcon width={24} height={24} color="#003247" />
                }
                text="Avaliações"
                onPress={navigateFeedback}
              />
              <ProfileMenuItem
                icon={<PhoneIcon width={24} height={24} color="#003247" />}
                text="FAQ"
                onPress={navigateFaq}
              />
            </View>
            <View className="flex-[2]" />
            <Button
              onPress={logout}
              className="flex-row items-center justify-center gap-2"
            >
              <Typography
                type="h3"
                className="text-[#E62121] font-poppins-semi-bold"
                text="Sair"
              />
              <ExitIcon color="#E62121" width={24} height={24} />
            </Button>
            <View className="h-4" />
          </View>
        </View>
      </View>
    </View>
  );
}
