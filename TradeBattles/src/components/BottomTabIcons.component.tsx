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

export const SettingsIcon: React.FC<IconProps> = ({
  size = 40,
  color = 'teal',
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 313.323 329.47">
      <Path
        id="icons8-ajustes"
        d="M158.662,2c-6.652,0-12.051,5.677-12.051,12.672V16.85c0,6.057-4.056,11.461-9.744,12.424-2.76.469-5.491,1.012-8.191,1.658-5.592,1.343-11.246-1.986-13.44-7.549l-.8-1.98A11.842,11.842,0,0,0,98.69,14.548a12.9,12.9,0,0,0-6.52,16.558l.8,2.029c2.217,5.576.444,12.176-4.448,15.37q-3.543,2.319-6.92,4.851A11.443,11.443,0,0,1,66.4,51.8l-1.459-1.534a11.626,11.626,0,0,0-17.041,0,13.149,13.149,0,0,0,0,17.919l1.459,1.534A12.962,12.962,0,0,1,50.839,85.7q-2.4,3.554-4.613,7.276a11.564,11.564,0,0,1-14.64,4.7l-1.906-.841A11.884,11.884,0,0,0,13.91,103.7a12.922,12.922,0,0,0,6.52,16.558l1.883.817a12.621,12.621,0,0,1,7.2,14.132c-.615,2.839-1.155,5.711-1.6,8.613a12.018,12.018,0,0,1-11.792,10.246H14.051C7.4,154.063,2,159.74,2,166.735s5.4,12.672,12.051,12.672h2.071a12.04,12.04,0,0,1,11.816,10.246c.446,2.9.962,5.774,1.577,8.613A12.606,12.606,0,0,1,22.336,212.4l-1.883.842a12.9,12.9,0,0,0-6.52,16.558,11.842,11.842,0,0,0,15.746,6.856l1.93-.841a11.571,11.571,0,0,1,14.64,4.678c1.47,2.484,3,4.919,4.613,7.3a12.964,12.964,0,0,1-1.483,15.988L47.9,265.314a13.124,13.124,0,0,0,0,17.919,11.636,11.636,0,0,0,17.041,0l1.483-1.534A11.416,11.416,0,0,1,81.6,280.114q3.4,2.547,6.943,4.876c4.881,3.193,6.677,9.806,4.472,15.394l-.8,2a12.951,12.951,0,0,0,6.52,16.582,11.859,11.859,0,0,0,15.746-6.856l.777-1.98c2.193-5.563,7.848-8.917,13.44-7.573,2.7.646,5.431,1.214,8.191,1.683,5.652.925,9.721,6.318,9.721,12.375V318.8c0,6.995,5.4,12.672,12.051,12.672s12.051-5.677,12.051-12.672V316.62c0-6.057,4.056-11.461,9.744-12.424,2.76-.469,5.491-1.012,8.191-1.658,5.592-1.343,11.246,1.986,13.44,7.549l.8,1.98a11.842,11.842,0,0,0,15.746,6.856,12.9,12.9,0,0,0,6.52-16.558l-.8-2.029c-2.205-5.588-.432-12.188,4.448-15.394,2.362-1.546,4.678-3.153,6.943-4.851a11.443,11.443,0,0,1,15.2,1.559l1.459,1.559a11.626,11.626,0,0,0,17.041,0,13.137,13.137,0,0,0,0-17.919l-1.459-1.559a12.931,12.931,0,0,1-1.506-15.964q2.422-3.573,4.637-7.3a11.577,11.577,0,0,1,14.64-4.7l1.907.841a11.884,11.884,0,0,0,15.77-6.856,12.922,12.922,0,0,0-6.52-16.558l-1.883-.817a12.621,12.621,0,0,1-7.2-14.132c.615-2.839,1.155-5.711,1.6-8.613A11.976,11.976,0,0,1,301.2,179.407h2.071c6.652,0,12.051-5.677,12.051-12.672s-5.4-12.672-12.051-12.672H301.2a12.04,12.04,0,0,1-11.816-10.246c-.446-2.9-.962-5.774-1.577-8.613a12.606,12.606,0,0,1,7.179-14.132l1.883-.841a12.9,12.9,0,0,0,6.52-16.558,11.842,11.842,0,0,0-15.746-6.856l-1.93.841a11.571,11.571,0,0,1-14.64-4.678c-1.47-2.484-3-4.919-4.613-7.3a12.964,12.964,0,0,1,1.483-15.988l1.483-1.534a13.124,13.124,0,0,0,0-17.919,11.626,11.626,0,0,0-17.041,0L250.926,51.8a11.446,11.446,0,0,1-15.2,1.584q-3.4-2.547-6.943-4.876c-4.881-3.193-6.654-9.806-4.448-15.394l.8-2a12.951,12.951,0,0,0-6.52-16.582,11.859,11.859,0,0,0-15.746,6.856l-.8,1.98c-2.193,5.563-7.848,8.917-13.44,7.573-2.7-.646-5.431-1.214-8.191-1.683-5.664-.95-9.721-6.342-9.721-12.4V14.672C170.713,7.677,165.314,2,158.662,2Zm0,63.36c49.151,0,89.642,38.711,95.583,88.7H179.492a23.914,23.914,0,0,0-20.83-12.672h-.024L121.262,73.28A92.011,92.011,0,0,1,158.662,65.36ZM100.455,86.05l37.353,68.013a26.246,26.246,0,0,0,0,25.294l-37.377,68.037a104.3,104.3,0,0,1,.024-161.344Zm79.06,93.356h74.73c-5.942,49.992-46.432,88.7-95.583,88.7a92.01,92.01,0,0,1-37.4-7.92l37.377-68.112h.024A23.913,23.913,0,0,0,179.515,179.407Z"
        transform="translate(-2 -2)"
        fill={color}
      />
    </Svg>
  );
};
