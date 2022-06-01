import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {theme} from './themes';
import {NavigationContainer} from '@react-navigation/native';
import {BottomTabsNavigator} from './screens/BottomTabs.navigator';

export const App: React.FC = () => {
  return (
    <NavigationContainer>
      <BottomTabsNavigator />
    </NavigationContainer>
  );
};
