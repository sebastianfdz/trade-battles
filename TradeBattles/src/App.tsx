import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Navigation} from './services/Navigator.navigation';

export const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Navigation />
    </NavigationContainer>
  );
};
