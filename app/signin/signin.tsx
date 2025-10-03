import { useState } from 'react';
import { Text, View, Image, TouchableWithoutFeedback, Keyboard, TouchableOpacity } from "react-native"; 
import { EmailIcon } from "assets/icons/email-icon";
import { Input } from "@/components/input";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { KeyIcon } from "assets/icons/key-icon";
import { OpenEyeIcon } from "assets/icons/open-eye-icon";
import { ClosedEyeIcon } from "assets/icons/closed-eye-icon";
import { Button } from "@/components/button";

import { Controller, useForm } from 'react-hook-form'
import { router } from 'expo-router';

interface FormDataLogin {
  email: string;
  password: string;
}

export default function SignIn() {
  const { control, handleSubmit, formState: { errors } } = useForm<FormDataLogin>({ mode: 'onChange' });

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const onSubmit = (data: FormDataLogin) => {
    console.log('data = ', data);
  }

  return (
    <View className='flex-1 bg-[#FDF6F5]'>
      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="always"
        showsVerticalScrollIndicator={false}
        enableOnAndroid={true}
        extraScrollHeight={20}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className="items-center">
            <Image 
              resizeMode="contain" 
              source={require("@/assets/images/goat-greeting.png")} 
              className="w-70 h-70 z-10" 
            />
            <View className="w-full bg-[#FBF3ED] rounded-t-3xl items-center p-4 -mt-20 pt-24">

              <View className="w-full items-center justify-center mb-5">
                <Text className="text-[#FF6B35] text-[30px] font-poppins-semi-bold text-center">Bem-vindo de volta!</Text>
                <Text className="text-[#797777] text-[14px] font-poppins-medium text-center">A gente sentiu sua falta</Text>
              </View>
              
              <View className="mt-5 w-full max-w-[300px] gap-7">
                <View className="gap-3">

                  <Controller
                    control={control}
                    name="email"
                    rules={{ required: 'O e-mail é obrigatório.' }}
                    render={({ field: { onChange, value }}) => (
                      <Input.Root className="gap-1">
                        <Input.Label text='Email' />
                        <Input.Field value={value} onChangeText={onChange} placeholder="seunome@email.com" className="w-full h-[55px] shadow-lg">
                          <Input.ContentLeft >
                            <EmailIcon />
                          </Input.ContentLeft>
                        </Input.Field>
                      </Input.Root>
                    )}
                  />

                  <Controller
                    control={control}
                    name="password"
                    rules={{ required: 'O campo senha é obrigatório.' }}
                    render={({ field: { onChange, value }}) => (
                      <Input.Root className="gap-1">
                        <Input.Label text='Senha' />
                        <Input.Field value={value} onChangeText={onChange} placeholder="********" secureTextEntry={!isPasswordVisible} className="w-full h-[55px] shadow-lg">
                          <Input.ContentLeft >
                            <KeyIcon />
                          </Input.ContentLeft>
                          <Input.ContentRight >
                             <TouchableOpacity onPress={togglePasswordVisibility}>
                              {isPasswordVisible ? <OpenEyeIcon /> : <ClosedEyeIcon />}
                            </TouchableOpacity>
                          </Input.ContentRight>
                        </Input.Field>
                      </Input.Root>
                    )}
                  />

                  <TouchableOpacity onPress={() => {}}>
                    <Text className="font-poppins-medium text-[#797777] text-sm text-right w-full pb-5">Esqueceu a senha?</Text>
                  </TouchableOpacity>

                  <View>
                    <Button onPress={handleSubmit(onSubmit)} className="flex items-center justify-center w-full h-[50px] bg-[#FF6B35] data-[pressed]:bg-[#e85a28]">
                      <Text className="text-[#F3F3F3] font-semibold text-lg">Login</Text>
                    </Button>
                  </View>

                  <View>
                    <Button onPress={() => router.push('/signup/signup')} className="flex items-center justify-center w-full h-[50px] bg-[#FF6B35] data-[pressed]:bg-[#e85a28]">
                      <Text className="text-[#F3F3F3] font-semibold text-lg">Cadastre-se</Text>
                    </Button>
                  </View>

                  <View className="flex w-full items-center gap-4 pt-3">
                    <Text className="font-poppins-medium text-[#797777] text-xs">Ou continue com</Text>
                    <TouchableOpacity onPress={() => {}}>
                        <Image resizeMode="contain" source={require("@/assets/images/google-icon.png")} />
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity onPress={() => {}}>
                    <Text className="font-poppins-medium text-[#797777] text-sm text-center pt-3">Acessar como convidado</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAwareScrollView>
    </View>
  )
}