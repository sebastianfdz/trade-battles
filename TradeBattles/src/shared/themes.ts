import {useContext} from 'react';

const darkmode = false;

export const theme = {
  // colors
  primary_green: '#09BE8E',
  primary_yellow: '#F7E733',
  light_mode_white: 'white',
  stockCardBackground: darkmode ? '#121212' : 'white',

  colorPrimary: darkmode ? 'white' : 'black',
  greyPrimary: darkmode ? '#F7F7F7' : '#E0E0E0',
  // fonts
  fontFamilyBold: 'PlusJakartaSans-Bold',
  fontFamilyRegular: 'PlusJakartaSans-Regular',
  fontFamilyLight: 'PlusJakartaSans-Light',
};
