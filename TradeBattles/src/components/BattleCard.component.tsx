import React from 'react';
import {Text, View, Image, StyleSheet} from 'react-native';
import {theme} from '../shared/themes';
import {useUserContext} from '../App.provider';
import {BattleCardHeader} from './BattleCardHeader.component';
import {BattleMember} from '../shared/Types';

export const BattleCard: React.FC<{
  battle_name: string;
  battle_members: BattleMember[];
}> = ({battle_name, battle_members}) => {
  const userContext = useUserContext();
  return (
    <View style={styles.container}>
      <BattleCardHeader battle_name={battle_name} />

      <Text>Current user: {userContext.user.name}</Text>
      {battle_members.map(member => {
        return (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 10,
              paddingHorizontal: 10,
            }}>
            <Image
              style={{width: 30, height: 30, borderRadius: 50, marginRight: 10}}
              source={{uri: member.photo}}
            />
            <Text>
              {member.first_name} {member.last_name}
            </Text>
          </View>
        );
      })}
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
