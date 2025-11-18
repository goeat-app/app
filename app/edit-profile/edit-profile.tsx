import {
  View,
  Image,
  TouchableOpacity,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { Ionicons } from '@expo/vector-icons';

import { CalendarIcon } from '@/assets/icons/calendar-icon';
import { CameraIcon } from '@/assets/icons/camera-icon';
import { Button } from '@/components/button';
import { Input } from '@/components/input';
import { Typography } from '@/components/typography/typography';

import { useEditProfileModel } from './edit-profile.model';

export default function EditProfileFloating() {
  const { windowHeight, avatarHalfSize, isKeyboardVisible, handleGoBack } =
    useEditProfileModel();

  return (
    <View className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />

      <View
        className="absolute top-0 left-0 right-0 h-[400px] bg-[#FF6B35] z-0"
        style={{
          borderBottomLeftRadius: 50,
          borderBottomRightRadius: 50,
        }}
      />

      {!isKeyboardVisible && (
        <View className="justify-start pt-4 px-4 absolute top-0 left-0 z-10">
          <TouchableOpacity onPress={handleGoBack} className="self-start">
            <Ionicons
              name="arrow-back-circle-outline"
              size={42}
              color="#FFFAF9"
            />
          </TouchableOpacity>
        </View>
      )}

      <KeyboardAwareScrollView
        style={{ flex: 1, zIndex: 5 }}
        scrollEnabled={isKeyboardVisible}
        extraScrollHeight={50}
        enableOnAndroid={true}
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 24,
        }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="always"
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View
            className="items-center"
            style={{ minHeight: windowHeight, justifyContent: 'center' }}
          >
            <View className="z-10">
              <Image
                className="w-32 h-32 rounded-full border-4 border-white"
                source={require('@/assets/images/avatar.png')}
              />
              <TouchableOpacity
                className="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full items-center justify-center border-2 border-white"
                activeOpacity={0.7}
              >
                <CameraIcon color="#FF6B35" width={18} height={15} />
              </TouchableOpacity>
            </View>

            <View
              className="bg-white rounded-3xl w-full p-6"
              style={{
                marginTop: -avatarHalfSize,
                paddingTop: avatarHalfSize + 24,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.1,
                shadowRadius: 8,
                elevation: 10,
              }}
            >
              <View className="gap-4">
                <Input.Root>
                  <Input.Label text="Nome completo" />
                  <Input.Field
                    placeholder="Fulano de tal"
                    className="border border-gray-300 rounded-3xl h-[50px] px-4"
                  />
                </Input.Root>

                <Input.Root>
                  <Input.Label text="E-mail" />
                  <Input.Field
                    placeholder="fulano@email.com"
                    className="border border-gray-300 rounded-3xl h-[50px] px-4"
                  />
                </Input.Root>

                <Input.Root>
                  <Input.Label text="Telefone" />
                  <Input.Field
                    placeholder="(19) 99999-9999"
                    className="border border-gray-300 rounded-3xl h-[50px] px-4"
                  />
                </Input.Root>

                <Input.Root>
                  <Input.Label text="Data de nascimento" />
                  <Input.Field
                    placeholder="14/08/2002"
                    className="border border-gray-300 rounded-3xl h-[50px] px-4"
                  >
                    <Input.ContentRight>
                      <CalendarIcon />
                    </Input.ContentRight>
                  </Input.Field>
                </Input.Root>
              </View>
              <Button className="flex items-center justify-center h-[50px] bg-[#FF6B35] mt-8 rounded-full">
                <Typography
                  type="h5"
                  className="font-poppins-semi-bold text-white"
                  text="Salvar"
                />
              </Button>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAwareScrollView>
    </View>
  );
}
