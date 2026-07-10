import { ReactNode } from 'react';
import { TouchableWithoutFeedbackProps } from 'react-native';

export interface KeyboardDismissWrapperProps extends Omit<
  TouchableWithoutFeedbackProps,
  'children'
> {
  children: ReactNode;
}
