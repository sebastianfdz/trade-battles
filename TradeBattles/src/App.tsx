import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Navigation} from './screens/LoginStackNavigator.navigation';
import {UserProvider, ThemeProvider} from './App.provider';
import {LogBox} from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications
import {showNotification} from './shared/Notification';

export const App: React.FC = () => {
  // setTimeout(
  //   () =>
  //     showNotification(
  //       'Battle time is near..',
  //       "'Codeworks Battle' starts in 1 day",
  //     ),
  //   100000,
  // );
  return (
    <UserProvider>
      <ThemeProvider>
        <NavigationContainer>
          <Navigation />
        </NavigationContainer>
      </ThemeProvider>
    </UserProvider>
  );
};
