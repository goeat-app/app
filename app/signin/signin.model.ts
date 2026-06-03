import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { router } from 'expo-router';
import { googleSignInUseCase } from 'use-cases/login/google-signin.use-case';
import { signInUseCase } from 'use-cases/login/signin.use-case';

import { toast } from '@/components/toast/toast';
import { loadingWrapper } from '@/hooks/loading-wrapper';

import { FormDataLogin } from './signin.types';

export default function useSignInModel() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataLogin>({ mode: 'onChange' });

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const onSubmit = async (data: FormDataLogin) => {
    const result = await loadingWrapper(() => signInUseCase(data));

    if (result.success) {
      router.replace('/home/home');
    } else {
      toast({
        type: 'error',
        text1:
          result.error || 'Erro ao fazer login. Por favor, tente novamente.',
      });
    }
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
    isPasswordVisible,
    togglePasswordVisibility,
    control,
    errors,
    onSubmit: handleSubmit(onSubmit),
    onGoogleSignIn,
  };
}
