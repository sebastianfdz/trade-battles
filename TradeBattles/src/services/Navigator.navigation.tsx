import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {BattlePortfolio} from '../screens/BattlePortfolio.screen';
import {StockDetails} from '../screens/StockDetails.screen';
import {BottomTabsNavigator} from './BottomTabs.navigator';
import {RootStackParamList} from '../shared/Types';
import {LoginOnlySocial} from '../screens/LoginOnlySocial.screen';
import {useUserContext} from '../App.provider';
import {MyBattles} from '../screens/MyBattles.screen';
import {ProfileScreenNavigationProp} from '../shared/Types';
import {useNavigation} from '@react-navigation/native';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const Navigation: React.FC = () => {
  const userContext = useUserContext();
  console.warn(userContext.user.id, 'INITIAL USER FROM NAVIGATION');

  const navigation = useNavigation<ProfileScreenNavigationProp>();

  useEffect(() => {
    // hangle login logout usercontext change
    navigation.navigate('MyBattles', {
      user_id: userContext.user.id,
    });
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
          <Stack.Screen name={'BattlePortfolio'} component={BattlePortfolio} />
          <Stack.Screen name={'BuySellStock'} component={StockDetails} />
          <Stack.Screen name="MyBattles" component={MyBattles} />
        </>
      )}
    </Stack.Navigator>
  );
};
