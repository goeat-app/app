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
  const [isGoogleSignInLoading, setIsGoogleSignInLoading] = useState(false);

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
          result.error ||
          'Erro ao fazer login. Verifique suas credenciais e tente novamente.',
      });
    }
  };

  const onGoogleSignIn = async () => {
    if (isGoogleSignInLoading) return;

    setIsGoogleSignInLoading(true);
    try {
      const result = await googleSignInUseCase();

      if (result.success) {
        router.replace('/home/home');
      } else {
        toast({
          type: 'error',
          text1: result.error || 'Erro ao entrar com Google. Tente novamente.',
        });
      }
    } finally {
      setIsGoogleSignInLoading(false);
    }
  };

  return {
    isPasswordVisible,
    togglePasswordVisibility,
    control,
    errors,
    isGoogleSignInLoading,
    onGoogleSignIn,
    onSubmit: handleSubmit(onSubmit),
  };
}
