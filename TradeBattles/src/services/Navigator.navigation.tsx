import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {BottomTabsNavigator} from './BottomTabs.navigator';
import {LoginStackParamList} from '../shared/Types';
import {LoginOnlySocial} from '../screens/LoginOnlySocial.screen';
import {useUserContext} from '../App.provider';
import {LoginScreenNavigationProp} from '../shared/Types';
import {useNavigation} from '@react-navigation/native';

const Stack = createNativeStackNavigator<LoginStackParamList>();

export const Navigation: React.FC = () => {
  const userContext = useUserContext();
  // console.warn(userContext.user.id, 'INITIAL USER FROM NAVIGATION');

  const navigation = useNavigation<LoginScreenNavigationProp>();

  useEffect(() => {
    // hangle login logout usercontext change
    navigation.navigate('Home');
  }, [userContext]);

  return (
    <Stack.Navigator
      initialRouteName="LoginOnlySocial"
      screenOptions={{headerShown: false}}>
      {userContext.user.id === 'DEFAULT' ? (
        <Stack.Screen name={'LoginOnlySocial'} component={LoginOnlySocial} />
      ) : (
        <>
          <Stack.Screen name={'Home'} component={BottomTabsNavigator} />
        </>
      )}
    </Stack.Navigator>
  );
};
