import Svg, { Path, SvgProps } from "react-native-svg"

export const ProfileIcon = ({ width, height, ...props }: SvgProps) => (
  <Svg
    width={width ?? 18}
    height={height ?? 17}
    fill="none"
    {...props}
  >
    <Path
      fill="#828282"
      d="M17.288 15.702c-1.271-2.199-3.232-3.775-5.519-4.523a6.013 6.013 0 1 0-6.151 0c-2.288.747-4.248 2.324-5.52 4.523a.669.669 0 1 0 1.157.668c1.574-2.719 4.354-4.342 7.438-4.342 3.085 0 5.865 1.623 7.439 4.342a.669.669 0 1 0 1.156-.668ZM4.017 6.015a4.677 4.677 0 1 1 9.353 0 4.677 4.677 0 0 1-9.353 0Z"
    />
  </Svg>
)
