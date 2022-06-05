import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {MyBattles} from './MyBattles.screen';
import {PortfolioStockCard} from '../components/PortfolioStockCard.component';
import {BattlePortfolio} from './BattlePortfolio.screen';

const BottomTabs = createBottomTabNavigator();
export const BottomTabsNavigator: React.FC = () => {
  return (
    <BottomTabs.Navigator screenOptions={{headerShown: false}}>
      <BottomTabs.Screen name="Porfolio" component={BattlePortfolio} />
      <BottomTabs.Screen name="MyBattles" component={MyBattles} />
    </BottomTabs.Navigator>
  );
};
