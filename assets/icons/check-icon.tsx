import Svg, { Path, SvgProps } from "react-native-svg";

export const CheckIcon = (props: SvgProps) => (
  <Svg fill="none" {...props}>
    <Path
      fill={props.color ?? "#EB2553"}
      fillRule="evenodd"
      d="M20 10c0 5.523-4.477 10-10 10S0 15.523 0 10 4.477 0 10 0s10 4.477 10 10Zm-5.97-3.03a.75.75 0 0 1 0 1.06l-5 5a.75.75 0 0 1-1.06 0l-2-2a.75.75 0 1 1 1.06-1.06l1.47 1.47 2.235-2.236L12.97 6.97a.75.75 0 0 1 1.06 0Z"
      clipRule="evenodd"
    />
  </Svg>
)
