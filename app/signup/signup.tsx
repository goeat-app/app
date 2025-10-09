import { ProfileIcon } from "assets/icons/profile-icon";
import { EmailIcon } from "assets/icons/email-icon";
import { Input } from "@/components/input";
import { Text, View, Image, ScrollView, Platform, TouchableWithoutFeedback, Keyboard } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { KeyIcon } from "assets/icons/key-icon";
import { ClosedEyeIcon } from "assets/icons/closed-eye-icon";
import { Controller, useForm } from 'react-hook-form'
import { Button } from "@/components/button";
import { router } from "expo-router";
import { Typography } from "@/components/typography/typography";

interface FormDataRegister {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function SignUp() {
  const { control, handleSubmit, formState: { errors } } = useForm<FormDataRegister>({ mode: 'onChange' });

  const onSubmit = (data: FormDataRegister) => {
    console.log('data = ', data);
    
  }

  return (
    <View className='flex-1 p-4 flex-row h-full w-full bg-[--primary-bg]'>
      <View className="flex-1 flex-col items-center">

        <KeyboardAwareScrollView
          style={{ flex: 1 }}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView 
              contentContainerStyle={{ flexGrow: 1, padding: 16 }}
              keyboardShouldPersistTaps="always"
              showsVerticalScrollIndicator={false}
            >
              <View className="flex-1 w-full items-center justify-center">
                <Image resizeMode="contain" source={require("@/assets/images/goat-register.png")} />

                <View className="flex-1">
                  <Text className="text-[#FF6B35] text-[38px] font-poppins-semi-bold text-start">Bem-vindo(a)!</Text>
                  <Text className="text-[#797777] text-sm font-poppins-medium w-[300px]">Faça seu cadastro para garantir uma experiência ainda mais personalizada</Text>
                </View>
              </View>
              <View className="mt-5 max-w-[300px] gap-7">
                <View className="gap-3">
                  <Controller
                    control={control}
                    name="name"
                    rules={{ required: 'O nome é obrigatório.' }}
                    render={({ field: { onChange, value }}) => (
                      <Input.Root className="gap-1">
                        <Input.Label text='Nome' />
                        <Input.Field value={value} onChangeText={onChange} placeholder="Seu nome" className="w-full h-[55px] shadow-lg">
                          <Input.Indicator >
                            <ProfileIcon />
                          </Input.Indicator>  
                        </Input.Field>
                      </Input.Root>
                      
                    )}
                  />

                  <Controller
                    control={control}
                    name="email"
                    rules={{ required: 'O email é obrigatório.' }}
                    render={({ field: { onChange, value }}) => (
                      <Input.Root className="gap-1">
                        <Input.Label text='Email' />
                        <Input.Field value={value} onChangeText={onChange} placeholder="seuemail@email.com" className="w-full h-[55px] shadow-lg">
                          <Input.Indicator >
                            <EmailIcon />
                          </Input.Indicator>  
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
                        <Input.Field value={value} onChangeText={onChange} secureTextEntry className="w-full h-[55px] shadow-lg">
                          <Input.ContentLeft >
                            <KeyIcon />
                          </Input.ContentLeft>  
                          <Input.ContentRight >
                            <ClosedEyeIcon />
                          </Input.ContentRight>  
                        </Input.Field>
                      </Input.Root>
                    )}
                  />

                  <Controller
                    control={control}
                    name="confirmPassword"
                    rules={{ required: 'As senhas devem se coincidir.' }}
                    render={({ field: { onChange, value }}) => (
                      <Input.Root className="gap-1">
                        <Input.Label text='Confirmar a senha' />
                        <Input.Field value={value} onChangeText={onChange} secureTextEntry className="w-full h-[55px] shadow-lg">
                          <Input.ContentLeft >
                            <KeyIcon />
                          </Input.ContentLeft>  
                          <Input.ContentRight >
                            <ClosedEyeIcon />
                          </Input.ContentRight>  
                        </Input.Field>
                      </Input.Root>
                    )}
                  />
                </View>

                <View>
                  <Button onPress={() => router.push('/profile-mapping/step-one')} className="flex items-center justify-center w-full h-[50px] bg-[#FF6B35] data-[pressed]:bg-[#e85a28]">
                    <Typography 
                      type='h5' 
                      className="text-[#F3F3F3]" 
                      text='Cadastre-se' 
                    />
                  </Button>
                </View>
                
                <View className="flex w-full items-center gap-4">
                  <Typography 
                    type='small' 
                    className="font-poppins-medium text-[#79777]" 
                    text='Ou continue com' 
                  />
                  <Image resizeMode="contain" source={require("@/assets/images/google-icon.png")} />
                </View>

                <Typography 
                  type='span' 
                  text='Acessar como convidado' 
                  className='font-poppins-medium text-[#79777] text-center'
                />
              </View>
            </ScrollView>
          </TouchableWithoutFeedback>
        </KeyboardAwareScrollView>

      </View>
    </View>
  )
}