import Svg, { G, Path, Defs, ClipPath } from "react-native-svg"
import { SvgProps } from "react-native-svg"

export const NatureVeganIcon = ({ width = 15, height = 15, ...props }: SvgProps) => (
  <Svg
    width={width}
    height={height}
    fill="none"
    {...props}
  >
    <G
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      clipPath="url(#a)"
    >
      <Path d="M3.125 13.125c.313-2.813 1.563-5 4.375-6.25" />
      <Path d="M5.624 11.25c3.886 0 6.563-2.055 6.875-7.5V2.5H9.99C4.365 2.5 2.5 5 2.49 8.125c0 .625 0 1.875 1.25 3.125h1.884Z" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h15v15H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)
