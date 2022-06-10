import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StackNavigator} from './AppStackNavigator.navigation';
import {theme} from '../shared/themes';
import {HomeIcon} from '../components/BottomTabIcons.component';

const BottomTabs = createBottomTabNavigator();
export const BottomTabsNavigator: React.FC = () => {
  return (
    <BottomTabs.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarActiveTintColor: 'blue',
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: theme.colorPrimary,
          borderTopWidth: 1,
          height: 90,
          padding: 10,
        },
        tabBarIcon: () => {
          switch (route.name) {
            case 'StackNavigator':
              return <HomeIcon color={theme.light_mode_white} size={50} />;
          }
        },
      })}>
      <BottomTabs.Screen name="StackNavigator" component={StackNavigator} />
    </BottomTabs.Navigator>
  );
};
