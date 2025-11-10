import Svg, { Path, SvgProps } from "react-native-svg"

export const HomeIcon = ({ width, height, ...props }: SvgProps)=> (
  <Svg
    width={width ?? 74}
    height={height ?? 24}
    fill="none"
    {...props}
  >
    <Path
      fill="#FDF6F5"
      fillRule="evenodd"
      d="M11.386 1.21a1 1 0 0 1 1.228 0l9 7A1 1 0 0 1 22 9v11a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V9a1 1 0 0 1 .386-.79l9-7ZM4 9.49V20a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V9.49l-8-6.223-8 6.222Z"
      clipRule="evenodd"
    />
    <Path
      fill="#FDF6F5"
      fillRule="evenodd"
      d="M8 12a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v10a1 1 0 1 1-2 0v-9h-4v9a1 1 0 1 1-2 0V12Z"
      clipRule="evenodd"
    />
  </Svg>
)
