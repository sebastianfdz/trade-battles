import React from 'react';
import {Svg, Path, Circle} from 'react-native-svg';

type IconProps = {
  size?: number;
  color?: string;
};

export const HomeIcon: React.FC<IconProps> = ({size = 40, color = 'teal'}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 50.292 50.292">
      <Path
        id="battle-svgrepo-com"
        d="M51.52,48.731l-2.79,2.79a2.646,2.646,0,0,1-3.733,0l-7.553-7.553L33.516,47.9a3.517,3.517,0,0,1-4.976,0l-.3-.3a3.518,3.518,0,0,1,0-4.976L42.616,28.24a3.517,3.517,0,0,1,4.976,0l.3.3a3.518,3.518,0,0,1,0,4.976l-3.927,3.927L51.52,45A2.643,2.643,0,0,1,51.52,48.731ZM37.788,30.58,30.58,37.788,4.6,22.508A5.3,5.3,0,0,1,2,17.958V3.759A1.762,1.762,0,0,1,3.759,2h14.2a5.3,5.3,0,0,1,4.55,2.6Zm-5.255,1.953a.88.88,0,0,0,0-1.244L5.262,4.018A.88.88,0,0,0,4.018,5.262L31.289,32.533a.881.881,0,0,0,1.244,0Z"
        transform="translate(-2 -2)"
        fill={color}
      />
    </Svg>
  );
};
