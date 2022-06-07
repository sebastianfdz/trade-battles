import React from 'react';
import {Text, View, Pressable, StyleSheet} from 'react-native';
import {theme} from '../shared/themes';
import {useUserContext} from '../App.provider';
import {BattleCardHeader} from './BattleCardHeader.component';

export const BattleCard: React.FC = () => {
  const userContext = useUserContext();
  return (
    <View style={styles.container}>
      <BattleCardHeader />
      <Pressable
        onPress={() => console.warn(userContext.user.name)}
        style={{
          width: '100%',
          height: 50,
          backgroundColor: theme.primary_green,
        }}>
        <Text>Let me see that user please</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.greyPrimary,
    width: '100%',
    height: '100%',
    borderRadius: 34,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 3,
    shadowOpacity: 0.2,
  },
});
