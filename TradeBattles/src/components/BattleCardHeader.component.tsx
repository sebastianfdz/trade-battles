import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {theme} from '../shared/themes';

export const BattleCardHeader: React.FC<{
  battle_name: string;
}> = ({battle_name}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header_small}>{battle_name}</Text>
      <View style={styles.value_of_portfolio}>
        <Text
          style={{
            alignSelf: 'center',
            marginTop: 15,
            fontSize: 12,
          }}>
          Value of Portfolio
        </Text>
      </View>
      <Text
        style={{
          alignSelf: 'center',
          fontSize: 25,
        }}>
        $128,462.10
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.primary_yellow,
    height: 150,
    borderTopStartRadius: 34,
    borderTopEndRadius: 34,
  },
  header_small: {
    fontSize: 25,
    fontWeight: '700',
    marginTop: 30,
    alignSelf: 'center',
  },
  value_of_portfolio: {
    borderBottomWidth: 0.3,
    borderBottomColor: theme.colorPrimary,
    width: '60%',
    paddingBottom: 3,
    marginBottom: 3,
    alignSelf: 'center',
  },
  text: {},
});
