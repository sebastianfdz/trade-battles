import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {BattlePortfolio} from '../screens/BattlePortfolio.screen';
import {BuySellStock} from '../screens/BuySellStock.screen';
import {Stock} from '../shared/Types';
import {BottomTabsNavigator} from '../screens/BottomTabs.navigator';
import {LoginOnlySocial} from '../screens/LoginOnlySocial.screen';

export type RootStackParamList = {
  Home: undefined;
  BattlePortfolio: undefined;
  BuySellStock: {
    stock: Stock;
  };
  Login: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const Navigation: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={LoginOnlySocial} />
      <Stack.Screen name={'Home'} component={BottomTabsNavigator} />
      <Stack.Screen name={'BattlePortfolio'} component={BattlePortfolio} />
      <Stack.Screen name={'BuySellStock'} component={BuySellStock} />
    </Stack.Navigator>
  );
};
