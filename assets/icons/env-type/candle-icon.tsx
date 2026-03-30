import Svg, { Path, SvgProps } from "react-native-svg"

export const CandleIcon = ({ width = 15, height = 15, ...props }: SvgProps) => (
  <Svg
    width={width}
    height={height}
    fill="none"
    {...props}
  >
    <Path
      fill="#fff"
      d="M7.813 1.25c-1.038 0-1.875 2.087-1.875 3.125a1.875 1.875 0 1 0 3.75 0c0-1.038-.838-3.125-1.876-3.125Zm0 2.812a.625.625 0 1 1 0 1.25.625.625 0 0 1 0-1.25ZM6.25 6.875a.625.625 0 0 0-.625.625v5h-1.25a.625.625 0 0 1-.625-.625v-.625a.625.625 0 1 0-1.25 0v.625a1.875 1.875 0 0 0 1.875 1.875h7.5a.625.625 0 0 0 0-1.25H10v-5a.625.625 0 0 0-.625-.625H6.25Z"
    />
  </Svg>
)
