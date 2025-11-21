import { useForm } from 'react-hook-form';
import { FormDataRegister } from './signup.types';
import { router } from 'expo-router';
import { cleanPhoneMask } from '@/lib/utils/format-phone-mask';
import { loadingWrapper } from '@/hooks/loading-wrapper';
import { registerUserUseCase } from 'use-cases/register.use-case';
import { useState } from 'react';
import { toast } from '@/components/toast/toast';

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
      router.replace('/profile-mapping/step-one/step-one');
    } else {
      toast({ type: 'error', text1: result.error });
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return {
    control,
    errors,
    onSubmit: handleSubmit(onSubmit),
    togglePasswordVisibility,
    isPasswordVisible,
    watch,
  };
}
