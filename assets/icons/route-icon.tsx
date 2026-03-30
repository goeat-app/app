import Svg, { Path } from "react-native-svg"
import { SvgProps } from "react-native-svg"

export const RouteIcon = (props: SvgProps) => (
  <Svg
    width={9}
    height={9}
    fill="none"
    {...props}
  >
    <Path
      fill="#4B5563"
      d="M7.814.062.505 3.435c-.843.394-.562 1.63.337 1.63h3.093v3.093c0 .9 1.236 1.18 1.63.337l3.373-7.309C9.22.511 8.488-.219 7.814.062Z"
    />
  </Svg>
)
