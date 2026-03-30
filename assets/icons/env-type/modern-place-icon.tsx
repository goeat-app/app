import Svg, { Path } from "react-native-svg"
import { SvgProps } from "react-native-svg"

export const ModernPlaceIcon = ({ width = 8, height = 12, ...props }: SvgProps) => (
  <Svg
    width={width}
    height={height}
    fill="none"
    {...props}
  >
    <Path
      fill="#fff"
      d="M0 11.25V3.125a1.25 1.25 0 0 1 1.25-1.25L6.25 0v1.875a1.25 1.25 0 0 1 1.25 1.25v8.125H3.75V8.125h-2.5v3.125H0ZM5 10h1.25V8.125H5V10ZM1.25 6.25H2.5v-2.5H1.25v2.5Zm2.5 0h2.5v-2.5h-2.5v2.5Z"
    />
  </Svg>
)
