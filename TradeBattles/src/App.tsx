import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {BottomTabsNavigator} from './screens/BottomTabs.navigator';
import {LoginOnlySocial} from './screens/LoginOnlySocial.screen';
import {Login} from './screens/Login.screen';
import {PortfolioStockCard} from './components/PortfolioStockCard.component';
import {Navigation} from './components/Navigator.navigation';

export const App: React.FC = () => {
  return (
    <NavigationContainer>
      {/* <LoginOnlySocial /> */}
      {/* <Login /> q */}
      <Navigation />
      {/* <BottomTabsNavigator /> */}
    </NavigationContainer>
  );
};
