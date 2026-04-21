import { SvgProps } from 'react-native-svg';

type RatingProps = {
  value: number;
  max?: number;
  size?: number;
  filledColor?: string;
  emptyColor?: string;
  Icon: React.ComponentType<SvgProps>;
};

export { RatingProps };
