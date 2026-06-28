import { Platform, TouchableWithoutFeedback } from 'react-native';

import { KeyboardDismissWrapperProps } from './keyboard-dismiss-wrapper.types';

export const KeyboardDismissWrapper = ({
  children,
  ...props
}: KeyboardDismissWrapperProps) => {
  // On web, return empty fragment since TouchableWithoutFeedback is not supported
  if (Platform.OS === 'web') {
    return <>{children}</>;
  }

  // On mobile, wrap with TouchableWithoutFeedback
  return (
    <TouchableWithoutFeedback {...props}>{children}</TouchableWithoutFeedback>
  );
};
