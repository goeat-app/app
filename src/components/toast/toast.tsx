import Toast from 'react-native-toast-message';

export interface ToastProps {
  type?: 'success' | 'error' | 'info';
  text1: string;
}

export const toast = ({ type, text1 }: ToastProps) => {
  Toast.show({
    type,
    text1,
    visibilityTime: 3000,
    autoHide: true,
    topOffset: 60,
  });
};
