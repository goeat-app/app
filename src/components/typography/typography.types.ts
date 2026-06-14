import { TextProps } from 'react-native';

import { tag } from './constants';

export type ITextProps = TextProps & {
  text: string;
  type: keyof typeof tag;
  className?: string;
};
