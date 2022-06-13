import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export const WatchList = () => {
  return (
    <View style={styles.container}>
      <Text>WATCHLIST SCREEN</Text>
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
