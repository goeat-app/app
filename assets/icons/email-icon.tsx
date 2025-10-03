import Svg, { Path, SvgProps } from "react-native-svg"

export const EmailIcon = ({ width, height, ...props }: SvgProps) => (
  <Svg
    width={width ?? 19}
    height={height ?? 15}
    fill="none"
    {...props}
  >
    <Path
      fill="#828282"
      d="M3 0h13a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3H3a3 3 0 0 1-3-3V3a3 3 0 0 1 3-3Zm0 1c-.5 0-.94.17-1.28.47L9.5 6.5l7.78-5.03C16.94 1.17 16.5 1 16 1H3Zm6.5 6.71L1.13 2.28C1.05 2.5 1 2.75 1 3v9a2 2 0 0 0 2 2h13a2 2 0 0 0 2-2V3c0-.25-.05-.5-.13-.72L9.5 7.71Z"
    />
  </Svg>
);