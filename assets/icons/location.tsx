import Svg, { Path, SvgProps } from "react-native-svg"

export const LocationIcon = ({ width, height, fill, ...props }: SvgProps) => (
  <Svg
    width={ width ?? 11}
    height={height ?? 14}
    viewBox="0 0 11 14"
    fill="none"
    {...props}
  >
    <Path
      fill={fill ?? "#ED6C1C"}
      d="M5.5 0A5.507 5.507 0 0 0 0 5.5c0 4.706 5 8.26 5.213 8.41a.501.501 0 0 0 .574 0C6 13.76 11 10.206 11 5.5A5.506 5.506 0 0 0 5.5 0Zm0 3.5a2 2 0 1 1 0 4 2 2 0 0 1 0-4Z"
    />
  </Svg>
)
