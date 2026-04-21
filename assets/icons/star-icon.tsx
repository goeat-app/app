import Svg, { Path, SvgProps } from 'react-native-svg';

export const StarIcon = (props: SvgProps) => (
  <Svg width={12} height={11} fill="none" viewBox="0 0 14 13" {...props}>
    <Path
      fill={props.color}
      d="M4.582.691c.299-.921 1.602-.921 1.902 0l.62 1.91a1 1 0 0 0 .951.69h2.008c.97 0 1.372 1.24.588 1.81L9.027 6.28A1 1 0 0 0 8.663 7.4l.62 1.91c.3.921-.754 1.688-1.538 1.118L6.12 9.247a1 1 0 0 0-1.175 0l-1.625 1.18c-.783.57-1.838-.197-1.539-1.118l.621-1.91a1 1 0 0 0-.363-1.118L.414 5.101c-.784-.57-.38-1.81.588-1.81H3.01a1 1 0 0 0 .951-.69l.62-1.91Z"
    />
  </Svg>
);
