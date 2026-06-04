import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { router } from 'expo-router';
import { googleSignInUseCase } from 'use-cases/login/google-signin.use-case';
import { registerUserUseCase } from 'use-cases/register/register.use-case';

import { toast } from '@/components/toast/toast';
import { loadingWrapper } from '@/hooks/loading-wrapper';
import { cleanPhoneMask } from '@/lib/utils/format-phone-mask';

import { FormDataRegister } from './signup.types';

export default function useSignUpModel() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormDataRegister>({ mode: 'onChange' });

  const onSubmit = async (data: FormDataRegister) => {
    const payload = {
      ...data,
      phone: cleanPhoneMask(data.phone),
    };

    const result = await loadingWrapper(() => registerUserUseCase(payload));

    if (result.success) {
      toast({ type: 'success', text1: 'Usuário registrado com sucesso!' });
      router.replace('/profile-mapping/step-one/step-one-view');
    } else {
      toast({
        type: 'error',
        text1: result.error || 'Erro ao cadastrar usuário. Tente novamente.',
      });
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const onGoogleSignIn = async () => {
    const result = await loadingWrapper(() => googleSignInUseCase());

    if (result.success) {
      router.replace('/home/home');
      return;
    }

    toast({
      type: 'error',
      text1: result.error || 'Erro ao autenticar com Google. Tente novamente.',
    });
  };

  return {
    control,
    errors,
    onSubmit: handleSubmit(onSubmit),
    togglePasswordVisibility,
    isPasswordVisible,
    onGoogleSignIn,
    watch,
  };
}
