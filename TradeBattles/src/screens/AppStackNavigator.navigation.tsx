import React from 'react';
import {RootStackParamList} from '../shared/Types';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {BattlePortfolio} from './BattlePortfolio.screen';
import {StockDetails} from './StockDetails.screen';
import {MyBattles} from './MyBattles.screen';
import {theme} from '../shared/themes';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const StackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        contentStyle: {backgroundColor: theme.stockCardBackground},

        headerShown: false,
      }}>
      <Stack.Screen name={'MyBattles'} component={MyBattles} />
      <Stack.Screen name={'BattlePortfolio'} component={BattlePortfolio} />
      <Stack.Screen name={'BuySellStock'} component={StockDetails} />
    </Stack.Navigator>
  );
};
