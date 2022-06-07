import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {BattlePortfolio} from '../screens/BattlePortfolio.screen';
import {StockDetails} from '../screens/StockDetails.screen';
import {BottomTabsNavigator} from './BottomTabs.navigator';
import {RootStackParamList} from '../shared/Types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const Navigation: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name={'Home'} component={BottomTabsNavigator} />
      <Stack.Screen name={'BattlePortfolio'} component={BattlePortfolio} />
      <Stack.Screen name={'BuySellStock'} component={StockDetails} />
    </Stack.Navigator>
  );
};
