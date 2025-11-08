import Svg, { G, Rect, Path, Defs, SvgProps } from 'react-native-svg';

export const FavoriteIcon = (props: SvgProps) => (
  <Svg width={30} height={30} fill="none" {...props}>
    <G filter="url(#a)">
      <Rect width={28} height={28} x={1} y={1} fill="#FF6B35" rx={14} />
    </G>
    <G filter="url(#b)">
      <Path
        fill="#FFC6C9"
        d="M15.08 9.913s-.346.288-.706.803c-.432.619-.883 1.565-.764 2.729"
      />
      <Path
        stroke="#FDFDFD"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.08 9.913s-.346.288-.706.803m-.764 2.729c-.119-1.164.332-2.11.764-2.73m0 0a5.438 5.438 0 0 1 1.463-1.404m0 0c.932-.616 1.9-.891 2.42-.957a4.495 4.495 0 0 1 3.304 1.261c1.89 1.852 2.167 5.343.46 7.404-1.708 2.061-4.509 2.975-6.231 5.07-.28.334-.518.7-.71 1.09a5.416 5.416 0 0 0-.706-1.09c-1.725-2.095-4.508-2.988-6.233-5.07-1.726-2.08-1.43-5.55.459-7.404 1.012-1.21 3.327-2.777 7.238-.304Z"
      />
    </G>
    <Defs></Defs>
  </Svg>
);
