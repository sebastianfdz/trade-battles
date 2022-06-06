import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Navigation} from './services/Navigator.navigation';
import {createContext} from 'react';
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
