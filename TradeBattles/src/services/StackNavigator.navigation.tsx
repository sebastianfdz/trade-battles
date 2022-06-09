import React from 'react';
import {GeneralStackNavigator} from '../shared/Types';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {BattlePortfolio} from '../screens/BattlePortfolio.screen';
import {StockDetails} from '../screens/StockDetails.screen';
import {MyBattles} from '../screens/MyBattles.screen';

const Stack = createNativeStackNavigator<GeneralStackNavigator>();

export const StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={'MyBattles'} component={MyBattles} />
      <Stack.Screen name={'BattlePortfolio'} component={BattlePortfolio} />
      <Stack.Screen name={'BuySellStock'} component={StockDetails} />
    </Stack.Navigator>
  );
};
