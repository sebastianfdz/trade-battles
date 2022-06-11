import React from 'react';
import {Pressable, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {Navigation} from './screens/LoginStackNavigator.navigation';
import {UserProvider} from './App.provider';

export const App: React.FC = () => {
  return (
    <UserProvider>
      <NavigationContainer>
        <Navigation />
      </NavigationContainer>
    </UserProvider>
  );
};
