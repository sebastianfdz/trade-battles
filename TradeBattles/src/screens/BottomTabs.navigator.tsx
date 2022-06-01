import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {MyBattles} from './MyBattles.screen';

const BottomTabs = createBottomTabNavigator();
export const BottomTabsNavigator: React.FC = () => {
  return (
    <BottomTabs.Navigator>
      <BottomTabs.Screen name="MyBattles" component={MyBattles} />
    </BottomTabs.Navigator>
  );
};
