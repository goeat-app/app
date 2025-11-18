import Svg, { Path, SvgProps } from 'react-native-svg';

type Props = SvgProps & {
  color?: string;
};

export const EnterPageIcon = ({
  width,
  height,
  color = '#003247',
  ...props
}: Props) => (
  <Svg
    width={width ?? 24}
    height={height ?? 24}
    viewBox="0 0 10 14"
    fill="none"
    {...props}
  >
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m1 1 8 6-8 6"
    />
  </Svg>
);
