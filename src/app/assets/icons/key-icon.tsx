import Svg, { Path, SvgProps } from "react-native-svg"
export const KeyIcon = ({ width, height, ...props }: SvgProps) => (
  <Svg
    width={width ?? 19}
    height={height ?? 19}
    fill="none"
    {...props}
  >
    <Path
      fill="#828282"
      d="m17.39 2.908.65-.64a.919.919 0 1 0-1.3-1.3l-1.28 1.29-2.59 2.59-5.775 5.765a4.575 4.575 0 1 0 1.3 1.3l5.115-5.125 1.94 1.949a.915.915 0 1 0 1.29-1.3l-1.94-1.94 1.3-1.29.64.64a.916.916 0 1 0 1.3-1.29l-.65-.65ZM4.58 17.174a2.745 2.745 0 1 1 0-5.49 2.745 2.745 0 0 1 0 5.49Z"
    />
  </Svg>
);