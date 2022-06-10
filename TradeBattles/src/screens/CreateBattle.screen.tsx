import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export const CreateBattle = () => {
  return (
    <View style={styles.container}>
      <Text>CREATE BATTLE SCREEN</Text>
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
