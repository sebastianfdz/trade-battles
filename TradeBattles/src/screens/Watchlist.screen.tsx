import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {WatchlistList} from '../components/WatchlistList.component';

export const WatchList = () => {
  return (
    <View style={styles.container}>
      <Text style={{fontSize: 30, fontWeight: '600', marginTop: 200}}>
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
  },
});
