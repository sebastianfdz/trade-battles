import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {theme} from './themes';
import {NavigationContainer} from '@react-navigation/native';
import {BottomTabsNavigator} from './screens/BottomTabs.navigator';
import {LoginOnlySocial} from './screens/LoginOnlySocial.screen';
import {Login} from './screens/Login.screen';

export const App: React.FC = () => {
  return (
    <NavigationContainer>
      <LoginOnlySocial />
      {/* <Login /> q */}
      {/* <BottomTabsNavigator /> */}
    </NavigationContainer>
  );
};
