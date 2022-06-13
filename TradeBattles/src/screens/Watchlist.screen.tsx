import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {WatchlistList} from '../components/WatchlistList.component';
import {theme} from '../shared/themes';

export const WatchList = () => {
  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 30,
          fontWeight: '600',
          marginTop: 100,
          marginBottom: 30,
        }}>
        Watchlist
      </Text>

      <WatchlistList />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.light_mode_white,
  },
});
