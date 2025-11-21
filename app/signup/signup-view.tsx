import { ProfileIcon } from 'assets/icons/profile-icon';
import { EmailIcon } from 'assets/icons/email-icon';
import { Input } from '@/components/input';
import { View, Image, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { KeyIcon } from 'assets/icons/key-icon';
import { ClosedEyeIcon } from 'assets/icons/closed-eye-icon';
import { Controller } from 'react-hook-form';
import { Button } from '@/components/button';
import { Typography } from '@/components/typography/typography';
import useSignUpModel from './signup.model';
import Feather from '@expo/vector-icons/Feather';
import { formatPhoneMask } from '@/lib/utils/format-phone-mask';
import { OpenEyeIcon } from '@/assets/icons/open-eye-icon';

export default function SignUpView() {
  const {
    control,
    onSubmit,
    togglePasswordVisibility,
    isPasswordVisible,
    errors,
    watch,
  } = useSignUpModel();

  return (
    <View className="flex-1 bg-[--primary-bg]">
      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1, padding: 16 }}
        enableOnAndroid={true}
        enableAutomaticScroll={true}
        extraScrollHeight={20}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className="flex-1 w-full items-center">
            <View className="flex-1 w-full items-center justify-center">
              <Image
                resizeMode="contain"
                source={require('@/assets/images/goat-register.png')}
              />

              <View className="gap-4">
                <Typography
                  type="h1"
                  className="text-5xl text-[#FF6B35] text-start"
                  text="Bem-vindo(a)!"
                />
                <Typography
                  type="p"
                  className="text-[#797777] font-poppins-medium w-[300px]"
                  text="Faça seu cadastro para garantir uma experiência ainda mais personalizada"
                />
              </View>
            </View>

            <View className="mt-5 max-w-[300px] gap-7 w-full">
              <View className="gap-3">
                <Controller
                  control={control}
                  name="name"
                  rules={{ required: 'O nome é obrigatório.' }}
                  render={({ field: { onChange, value } }) => (
                    <Input.Root className="gap-1">
                      <Input.Label text="Nome" />
                      <Input.Field
                        value={value}
                        onChangeText={onChange}
                        placeholder="Seu nome"
                        className="w-full h-[55px] shadow-lg"
                      >
                        <Input.Indicator>
                          <ProfileIcon />
                        </Input.Indicator>
                      </Input.Field>

                      {errors.name && (
                        <Typography
                          type="span"
                          className="text-[#FF6B35] font-poppins-semi-bold ml-1"
                          text={errors.name.message}
                        />
                      )}
                    </Input.Root>
                  )}
                />

                <Controller
                  control={control}
                  name="email"
                  rules={{ required: 'O email é obrigatório.' }}
                  render={({ field: { onChange, value } }) => (
                    <Input.Root className="gap-1">
                      <Input.Label text="Email" />
                      <Input.Field
                        value={value}
                        onChangeText={onChange}
                        placeholder="seuemail@email.com"
                        className="w-full h-[55px] shadow-lg"
                      >
                        <Input.Indicator>
                          <EmailIcon />
                        </Input.Indicator>
                      </Input.Field>

                      {errors.email && (
                        <Typography
                          type="span"
                          className="text-[#FF6B35] font-poppins-semi-bold ml-1"
                          text={errors.email.message}
                        />
                      )}
                    </Input.Root>
                  )}
                />

                <Controller
                  control={control}
                  name="phone"
                  rules={{ required: 'O número de celular é obrigatório.' }}
                  render={({ field: { onChange, value } }) => (
                    <Input.Root className="gap-1">
                      <Input.Label text="Phone" />
                      <Input.Field
                        value={value}
                        onChangeText={text => onChange(formatPhoneMask(text))}
                        keyboardType="phone-pad"
                        max-length={15}
                        placeholder="(19) 99999-9999"
                        className="w-full h-[55px] shadow-lg"
                      >
                        <Input.Indicator>
                          <Feather
                            name="phone-call"
                            size={24}
                            color="#828282"
                          />
                        </Input.Indicator>
                      </Input.Field>

                      {errors.phone && (
                        <Typography
                          type="span"
                          className="text-[#FF6B35] font-poppins-semi-bold ml-1"
                          text={errors.phone.message}
                        />
                      )}
                    </Input.Root>
                  )}
                />

                <Controller
                  control={control}
                  name="password"
                  rules={{
                    required: 'O campo senha é obrigatório.',
                    minLength: {
                      value: 6,
                      message: 'A senha deve ter no mínimo 6 caracteres',
                    },
                  }}
                  render={({ field: { onChange, value } }) => (
                    <Input.Root className="gap-1">
                      <Input.Label text="Senha" />
                      <Input.Field
                        value={value}
                        onChangeText={onChange}
                        secureTextEntry={!isPasswordVisible}
                        className="w-full h-[55px] shadow-lg"
                        placeholder="********"
                      >
                        <Input.ContentLeft>
                          <KeyIcon />
                        </Input.ContentLeft>
                        <Input.ContentRight>
                          <Button onPress={togglePasswordVisibility}>
                            {isPasswordVisible ? (
                              <OpenEyeIcon />
                            ) : (
                              <ClosedEyeIcon />
                            )}
                          </Button>
                        </Input.ContentRight>
                      </Input.Field>

                      {errors.password && (
                        <Typography
                          type="span"
                          className="text-[#FF6B35] font-poppins-semi-bold ml-1"
                          text={errors.password.message}
                        />
                      )}
                    </Input.Root>
                  )}
                />

                <Controller
                  control={control}
                  name="confirmPassword"
                  rules={{
                    required: 'A confirmação de senha é obrigatória.',
                    validate: value =>
                      value === watch('password') || 'As senhas não coincidem',
                  }}
                  render={({ field: { onChange, value } }) => (
                    <Input.Root className="gap-1">
                      <Input.Label text="Confirmar a senha" />
                      <Input.Field
                        value={value}
                        onChangeText={onChange}
                        secureTextEntry={!isPasswordVisible}
                        className="w-full h-[55px] shadow-lg"
                        placeholder="********"
                      >
                        <Input.ContentLeft>
                          <KeyIcon />
                        </Input.ContentLeft>
                        <Input.ContentRight>
                          <Button onPress={togglePasswordVisibility}>
                            {isPasswordVisible ? (
                              <OpenEyeIcon />
                            ) : (
                              <ClosedEyeIcon />
                            )}
                          </Button>
                        </Input.ContentRight>
                      </Input.Field>

                      {errors.confirmPassword && (
                        <Typography
                          type="span"
                          className="text-[#FF6B35] font-poppins-semi-bold ml-1"
                          text={errors.confirmPassword.message}
                        />
                      )}
                    </Input.Root>
                  )}
                />
              </View>

              <View>
                <Button
                  onPress={onSubmit}
                  className="flex items-center justify-center w-full h-[50px] bg-[#FF6B35] data-[pressed]:bg-[#e85a28]"
                >
                  <Typography
                    type="h5"
                    className="text-[#F3F3F3]"
                    text="Cadastre-se"
                  />
                </Button>
              </View>

              <View className="flex w-full items-center gap-4">
                <Typography
                  type="small"
                  className="font-poppins-medium text-[#79777]"
                  text="Ou continue com"
                />
                <Image
                  resizeMode="contain"
                  source={require('@/assets/images/google-icon.png')}
                />
              </View>

              <Typography
                type="span"
                text="Acessar como convidado"
                className="font-poppins-medium text-[#797777] text-center"
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAwareScrollView>
    </View>
  );
}
