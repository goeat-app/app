import Svg, { Path, SvgProps } from 'react-native-svg';

type Props = SvgProps & {
  color?: string;
};

export const MoneyIcon = ({
  width,
  height,
  color = '#ED6C1C',
  ...props
}: Props) => (
  <Svg width={width ?? 14} height={height ?? 14} fill="none" {...props}>
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M10.938 9.188V10.5a1.75 1.75 0 0 1-1.75 1.75H4.811a1.75 1.75 0 0 1-1.75-1.75V9.187a3.937 3.937 0 0 1 2.341-3.596 3.907 3.907 0 0 1 3.194 0 3.938 3.938 0 0 1 2.34 3.596v0Z"
    />
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m8.956 3.264-.36 2.327a3.907 3.907 0 0 0-3.193 0l-.359-2.327a.875.875 0 0 1 1.19-.945l.438.175c.208.083.44.083.647 0l.438-.175a.875.875 0 0 1 1.199.945v0ZM7.875 7.438H6.781a.656.656 0 0 0-.656.656v0a.656.656 0 0 0 .656.656h.438a.656.656 0 1 1 0 1.313H6.125M7 10.063v.437M7 7v.438"
    />
  </Svg>
);
