import Svg, { Path, SvgProps } from 'react-native-svg';

export const CashIcon = (props: SvgProps) => (
  <Svg width={props.width} height={props.height} fill="none" {...props}>
    <Path
      stroke={props.color ?? '#C2C2C2'}
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.625 13.125V15a2.5 2.5 0 0 1-2.5 2.5h-6.25a2.5 2.5 0 0 1-2.5-2.5v-1.875a5.625 5.625 0 0 1 3.344-5.138 5.581 5.581 0 0 1 4.562 0 5.494 5.494 0 0 1 1.694 1.163 5.625 5.625 0 0 1 1.65 3.975v0Z"
    />
    <Path
      stroke={props.color ?? '#C2C2C2'}
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m12.794 4.662-.513 3.325a5.581 5.581 0 0 0-4.562 0l-.513-3.325a1.25 1.25 0 0 1 1.7-1.35l.625.25c.297.119.628.119.925 0l.625-.25a1.25 1.25 0 0 1 1.713 1.35v0ZM11.25 10.625H9.687a.938.938 0 0 0-.937.938v0a.937.937 0 0 0 .938.937h.624a.938.938 0 0 1 0 1.875H8.75M10 14.375V15M10 10v.625"
    />
  </Svg>
);
