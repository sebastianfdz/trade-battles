import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StackNavigator} from './AppStackNavigator.navigation';
import {theme} from '../shared/themes';
import {HomeIcon, SettingsIcon} from '../components/BottomTabIcons.component';
import {CreateBattle} from './CreateBattle.screen';
import {ActivityFeed} from './ActivityFeed.screen';
import {PushNotification} from 'react-native';
import {Settings} from './Settings.screen';

const BottomTabs = createBottomTabNavigator();
export const BottomTabsNavigator: React.FC = () => {
  return (
    <BottomTabs.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarActiveTintColor: theme.colorPrimary,
        // tabBarActiveBackgroundColor: theme.greyPrimary,
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: theme.colorPrimary,
          // backgroundColor: theme.light_mode_white,
          borderTopWidth: 1,
          height: 90,
          padding: 10,
        },
        tabBarIcon: () => {
          switch (route.name) {
            case 'StackNavigator':
              return <HomeIcon color={theme.light_mode_white} size={50} />;
            case 'CreateBattle':
              return <HomeIcon color={theme.light_mode_white} size={30} />;
            case 'ActivityFeed':
              return <HomeIcon color={theme.light_mode_white} size={40} />;
            case 'Settings':
              return <SettingsIcon color={theme.light_mode_white} size={40} />;
          }
        },
      })}>
      <BottomTabs.Screen name="StackNavigator" component={StackNavigator} />
      <BottomTabs.Screen name="Settings" component={Settings} />
      {/* <BottomTabs.Screen name="ActivityFeed" component={ActivityFeed} /> */}
    </BottomTabs.Navigator>
  );
};
