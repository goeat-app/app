import Svg, { Path, SvgProps } from "react-native-svg"

export const UserIcon = ({ width, height, ...props }: SvgProps) => (
  <Svg
    width={ width ?? 24}
    height={height ?? 24}
    fill="none"
    {...props}
  >
    <Path
      fill="#FDF6F5"
      fillRule="evenodd"
      d="M4.464 15.464A5 5 0 0 1 8 14h8a5 5 0 0 1 5 5v2a1 1 0 1 1-2 0v-2a3 3 0 0 0-3-3H8a3 3 0 0 0-3 3v2a1 1 0 1 1-2 0v-2a5 5 0 0 1 1.464-3.536ZM12 4a3 3 0 1 0 0 6 3 3 0 0 0 0-6ZM7 7a5 5 0 1 1 10 0A5 5 0 0 1 7 7Z"
      clipRule="evenodd"
    />
  </Svg>
)