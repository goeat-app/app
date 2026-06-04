import { useEffect, useState } from 'react';
import { Keyboard, Platform, useWindowDimensions } from 'react-native';

import { router } from 'expo-router';

export function useEditProfileModel() {
  const { height: windowHeight } = useWindowDimensions();
  const avatarSize = 128;
  const avatarHalfSize = avatarSize / 2;

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardShowListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      () => setKeyboardVisible(true),
    );
    const keyboardHideListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      () => setKeyboardVisible(false),
    );

    return () => {
      keyboardShowListener.remove();
      keyboardHideListener.remove();
    };
  }, []);

  const handleGoBack = () => {
    router.back();
  };

  return {
    windowHeight,
    avatarHalfSize,
    isKeyboardVisible,
    handleGoBack,
  };
}
