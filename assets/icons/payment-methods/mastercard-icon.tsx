
import Svg, { G, Path, Defs, ClipPath, SvgProps } from "react-native-svg";

export const MastercardIcon = (props: SvgProps) => (
  <Svg
    width={24}
    height={16}
    viewBox="0 0 24 16"
    fill="none"
    {...props}
  >
    <G clipPath="url(#a)">
      <Path
        fill="#FDEACE"
        d="M0 2a2 2 0 0 1 2-2h20a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2Z"
      />
      <Path
        fill="#FF5F00"
        d="m14.504 3.264-5.165.017.157 9.455 5.164-.017-.156-9.455Z"
      />
      <Path
        fill="#EB001B"
        d="M9.68 8.028a5.983 5.983 0 0 1 2.178-4.74 5.911 5.911 0 0 0-3.68-1.275c-3.278.011-5.887 2.712-5.831 6.04.055 3.328 2.753 6.011 6.032 6a5.772 5.772 0 0 0 3.636-1.3A6.133 6.133 0 0 1 9.68 8.028Z"
      />
      <Path
        fill="#F79E1B"
        d="M21.653 7.947c.055 3.328-2.553 6.029-5.832 6.04a5.912 5.912 0 0 1-3.68-1.275c1.366-1.108 2.211-2.817 2.18-4.74a6.158 6.158 0 0 0-2.337-4.725 5.772 5.772 0 0 1 3.637-1.3c3.28-.011 5.977 2.689 6.032 6Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h24v16H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
