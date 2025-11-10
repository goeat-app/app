import Svg, { Path, SvgProps } from 'react-native-svg';

export const FavoriteIcon = (props: SvgProps) => (
  <Svg
    width={props.width ?? 21}
    height={props.height ?? 18}
    fill={props.fill ?? 'none'}
    {...props}
  >
    <Path
      stroke={props.color ?? '#fff'}
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M18.958 2.003A5.274 5.274 0 0 0 17.25.89a5.382 5.382 0 0 0-4.028 0 5.274 5.274 0 0 0-1.708 1.112L10.5 2.99l-1.014-.988A5.334 5.334 0 0 0 5.764.5c-1.396 0-2.735.54-3.722 1.503A5.064 5.064 0 0 0 .5 5.63c0 1.36.555 2.665 1.542 3.627l1.014.989L10.5 17.5l7.444-7.254 1.014-.989a5.122 5.122 0 0 0 1.141-1.664 5.015 5.015 0 0 0 0-3.926 5.122 5.122 0 0 0-1.141-1.664v0Z"
    />
  </Svg>
);
