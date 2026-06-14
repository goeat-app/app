import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { router } from 'expo-router';
import * as Location from 'expo-location';
import { registerUserUseCase } from 'use-cases/register/register.use-case';

import { toast } from '@/components/toast/toast';
import { loadingWrapper } from '@/hooks/loading-wrapper';
import { cleanPhoneMask } from '@/lib/utils/format-phone-mask';

import { FormDataRegister } from './signup.types';

async function getUserLocation(): Promise<{
  latitude: number;
  longitude: number;
}> {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
      return { latitude: 0, longitude: 0 };
    }

    const location = await Location.getCurrentPositionAsync({});
    return {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };
  } catch {
    return { latitude: 0, longitude: 0 };
  }
}

export default function useSignUpModel() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormDataRegister>({ mode: 'onChange' });

  const onSubmit = async (data: FormDataRegister) => {
    const { latitude, longitude } = await getUserLocation();

    const payload = {
      ...data,
      phone: cleanPhoneMask(data.phone),
      latitude,
      longitude,
    };

    const result = await loadingWrapper(() => registerUserUseCase(payload));

    if (result.success) {
      toast({ type: 'success', text1: 'Usuário registrado com sucesso!' });
      router.replace('/profile-mapping/step-one/step-one-view');
    } else {
      toast({
        type: 'error',
        text1: result.error || 'Erro ao registrar usuário',
      });
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
