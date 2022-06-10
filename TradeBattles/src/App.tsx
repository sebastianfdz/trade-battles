import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Navigation} from './screens/LoginStackNavigator.navigation';
import {UserProvider} from './App.provider';
import {View} from 'react-native';

export const App: React.FC = () => {
  return (
    <UserProvider>
      <NavigationContainer>
        <Navigation />
      </NavigationContainer>
    </UserProvider>
  );
};
