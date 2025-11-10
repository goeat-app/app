import Svg, { Path, SvgProps } from "react-native-svg"

export const RestaurantsIcon = ({ width, height, ...props }: SvgProps) => (
  <Svg
    width={width ?? 24}
    height={height ?? 24}
    fill="none"
    {...props}
  >
    <Path
      stroke="#FFFDF9"
      strokeLinejoin="round"
      d="m2.695 2.238 17.27 17.27a1.747 1.747 0 0 1 0 2.471 1.748 1.748 0 0 1-2.471 0l-4.22-4.291a1.5 1.5 0 0 1-.43-1.052v-.259a1.497 1.497 0 0 0-.447-1.068l-.544-.503a1.5 1.5 0 0 0-1.397-.348 2.276 2.276 0 0 1-2.183-.592L4.27 9.86c-2.376-2.376-3.25-5.963-1.574-7.623Z"
    />
    <Path
      stroke="#FFFDF9"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m18.75 1.5-3.621 3.621a3 3 0 0 0-.88 2.122v.696a.749.749 0 0 1-.219.531L13.5 9M15 10.5l.53-.53a.75.75 0 0 1 .53-.22h.697a3 3 0 0 0 2.122-.879l3.62-3.62M20.625 3.375l-3.75 3.75M9.375 17.25 4.7 21.95a1.875 1.875 0 0 1-2.652-2.65L6 15.375"
    />
  </Svg>
)
