import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {MyBattles} from '../screens/MyBattles.screen';

const BottomTabs = createBottomTabNavigator();
export const BottomTabsNavigator: React.FC = () => {
  return (
    <BottomTabs.Navigator screenOptions={{headerShown: false}}>
      <BottomTabs.Screen name="MyBattles" component={MyBattles} />
    </BottomTabs.Navigator>
  );
};
