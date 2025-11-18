import Svg, { G, Path, SvgProps } from 'react-native-svg';

type Props = SvgProps & {
  color?: string;
};

export const ExitIcon = ({
  width,
  height,
  color = '#E62121',
  ...props
}: Props) => (
  <Svg
    width={width ?? 24}
    height={height ?? 24}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <G
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
    >
      <Path d="M13 12v.01M3 21h18M5 21V5a2 2 0 0 1 2-2h7.5M17 13.5V21M14 7h7m0 0-3-3m3 3-3 3" />
    </G>
  </Svg>
);
