import { Controller } from 'react-hook-form';
import { View, Image, Keyboard, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { ClosedEyeIcon } from 'assets/icons/closed-eye-icon';
import { EmailIcon } from 'assets/icons/email-icon';
import { KeyIcon } from 'assets/icons/key-icon';
import { OpenEyeIcon } from 'assets/icons/open-eye-icon';
import { router } from 'expo-router';

import { Button } from '@/components/button';
import { Input } from '@/components/input';
import { KeyboardDismissWrapper } from '@/components/keyboard-dismiss-wrapper';
import { Typography } from '@/components/typography/typography';

import useSignInModel from './signin.model';

export default function SignIn() {
  const {
    control,
    onSubmit,
    isPasswordVisible,
    togglePasswordVisibility,
    errors,
    isGoogleSignInLoading,
    onGoogleSignIn,
  } = useSignInModel();

  return (
    <View className="flex-1 bg-[#FDF6F5]">
      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="always"
        showsVerticalScrollIndicator={false}
        enableOnAndroid={true}
        extraScrollHeight={20}
      >
        <KeyboardDismissWrapper onPress={Keyboard.dismiss}>
          <View className="items-center flex-1">
            <Image
              resizeMode="contain"
              source={require('@/assets/images/goat-greeting.png')}
              className="z-10"
              style={{ height: 180, width: '100%' }}
            />
            <View className="w-full bg-[#FBF3ED] rounded-t-3xl items-center p-4 -mt-20 pt-24 flex-1 justify-end">
              <View className="w-full items-center justify-center mb-5">
                <Typography
                  type="h2"
                  className="text-[#FF6B35] font-poppins-semi-bold text-center"
                  text="Bem-vindo de volta!"
                />
                <Typography
                  type="p"
                  className="text-[#797777] font-poppins-medium text-center"
                  text="A gente sentiu sua falta"
                />
              </View>

              <View className="mt-5 w-full max-w-[300px] gap-7">
                <View className="gap-3">
                  <Controller
                    control={control}
                    name="email"
                    rules={{ required: 'O e-mail é obrigatório.' }}
                    render={({ field: { onChange, value } }) => (
                      <Input.Root className="gap-1">
                        <Input.Label text="Email" />
                        <Input.Field
                          value={value}
                          onChangeText={onChange}
                          placeholder="seunome@email.com"
                          className="w-full h-[55px] shadow-lg"
                        >
                          <Input.ContentLeft>
                            <EmailIcon />
                          </Input.ContentLeft>
                        </Input.Field>

                        {errors.email && (
                          <Typography
                            type="span"
                            className="text-[#FF6B35] font-poppins-semi-bold ml-1"
                            text={
                              errors.email?.message ??
                              'O campo email é obrigatório.'
                            }
                          />
                        )}
                      </Input.Root>
                    )}
                  />

                  <Controller
                    control={control}
                    name="password"
                    rules={{ required: 'O campo senha é obrigatório.' }}
                    render={({ field: { onChange, value } }) => (
                      <Input.Root className="gap-1">
                        <Input.Label text="Senha" />
                        <Input.Field
                          value={value}
                          onChangeText={onChange}
                          placeholder="********"
                          secureTextEntry={!isPasswordVisible}
                          className="w-full h-[55px] shadow-lg"
                        >
                          <Input.ContentLeft>
                            <KeyIcon />
                          </Input.ContentLeft>
                          <Input.ContentRight>
                            <TouchableOpacity
                              onPress={togglePasswordVisibility}
                            >
                              {isPasswordVisible ? (
                                <OpenEyeIcon />
                              ) : (
                                <ClosedEyeIcon />
                              )}
                            </TouchableOpacity>
                          </Input.ContentRight>
                        </Input.Field>

                        {errors.password && (
                          <Typography
                            type="span"
                            className="text-[#FF6B35] font-poppins-semi-bold ml-1"
                            text={
                              errors.password?.message ??
                              'O campo senha é obrigatório.'
                            }
                          />
                        )}
                      </Input.Root>
                    )}
                  />

                  <TouchableOpacity onPress={() => {}}>
                    <Typography
                      type="p"
                      className="font-poppins-medium text-[#797777] text-right w-full pb-5"
                      text="Esqueceu a senha?"
                    />
                  </TouchableOpacity>

                  <View>
                    <Button
                      onPress={onSubmit}
                      className="flex items-center justify-center w-full h-[50px] bg-[#FF6B35] data-[pressed]:bg-[#e85a28]"
                    >
                      <Typography
                        type="h5"
                        className="text-[#F3F3F3] font-semibold"
                        text="Login"
                      />
                    </Button>
                  </View>

                  <View>
                    <Button
                      onPress={() => router.push('/signup/signup-view')}
                      className="flex items-center justify-center w-full h-[50px] bg-[#FF6B35] data-[pressed]:bg-[#e85a28]"
                    >
                      <Typography
                        type="h5"
                        className="text-[#F3F3F3] font-semibold"
                        text="Cadastre-se"
                      />
                    </Button>
                  </View>

                  <View className="flex w-full items-center gap-4 pt-3">
                    <Typography
                      className="font-poppins-medium text-[#797777]"
                      type="small"
                      text="Ou continue com"
                    />
                    <TouchableOpacity
                      accessibilityLabel="Entrar com Google"
                      accessibilityRole="button"
                      disabled={isGoogleSignInLoading}
                      onPress={() => void onGoogleSignIn()}
                    >
                      <Image
                        resizeMode="contain"
                        source={require('@/assets/images/google-icon.png')}
                      />
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity onPress={() => {}}>
                    <Typography
                      type="p"
                      className="font-poppins-medium text-[#797777] text-center pt-3"
                      text="Acessar como convidado"
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </KeyboardDismissWrapper>
      </KeyboardAwareScrollView>
    </View>
  );
}
