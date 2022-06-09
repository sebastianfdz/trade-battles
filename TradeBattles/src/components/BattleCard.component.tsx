import React from 'react';
import {Text, View, Image, StyleSheet, Pressable} from 'react-native';
import {theme} from '../shared/themes';
import {useUserContext} from '../App.provider';
import {BattleCardHeader} from './BattleCardHeader.component';
import {Battle, BattleMember} from '../shared/Types';
import {useNavigation} from '@react-navigation/native';
import {ProfileScreenNavigationProp} from '../shared/Types';

export const BattleCard: React.FC<{
  battle: Battle;
}> = ({battle}) => {
  const userContext = useUserContext();
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  return (
    <Pressable
      onPress={() => {
        navigation.navigate('BattlePortfolio', {
          battle: battle,
          user_id: userContext.user.id,
        });
      }}
      style={styles.container}>
      <BattleCardHeader battle_name={battle.battle_name} />

      <Text>Current user: {userContext.user.name}</Text>
      {battle.battle_members.map(member => {
        return (
          <View
            key={member.user_id}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 10,
              paddingHorizontal: 10,
            }}>
            <Image
              key={member.user_id + member.photo}
              style={{width: 30, height: 30, borderRadius: 50, marginRight: 10}}
              source={{uri: member.photo}}
            />
            <Text>
              {member.first_name} {member.last_name}
            </Text>
          </View>
        );
      })}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.greyPrimary,
    width: '80%',
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
