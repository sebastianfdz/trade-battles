import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
export const MyBattles: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>My Battles</Text>
    </View>
  );
};
const styles = StyleSheet.create({container: {flex: 1}});
