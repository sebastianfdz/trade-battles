import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export const ActivityFeed = () => {
  return (
    <View style={styles.container}>
      <Text>NEEWS FEED SCREEN</Text>
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
