import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {theme} from '../shared/themes';
import {Battle} from '../shared/Types';

export const BattlePortfolioHeader: React.FC<{battle: Battle}> = ({battle}) => {
  return (
    <View style={styles.container}>
      <View style={styles.portfolio_header_container}>
        <Text style={styles.title}>{battle.battle_name}</Text>
        <Text style={styles.available_capital}>$98,348.34</Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={styles.return_money}>$8,233.92</Text>
          <View style={styles.return_container}>
            <Text style={{color: 'white', fontWeight: '600'}}>+4.14%</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  portfolio_header_container: {
    backgroundColor: theme.greyPrimary,
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    color: theme.colorPrimary,
  },
  title: {
    fontSize: 30,
    marginBottom: 10,
    fontWeight: '200',
    color: theme.colorPrimary,
  },

  available_capital: {
    fontWeight: '700',
    fontSize: 40,
    marginBottom: 10,
    color: theme.colorPrimary,
  },
  return_container: {
    backgroundColor: theme.primary_green,
    padding: 5,
    borderRadius: 7,
  },
  return_money: {
    marginRight: 10,
    fontSize: 20,
    fontWeight: '500',
    color: theme.colorPrimary,
  },
});
