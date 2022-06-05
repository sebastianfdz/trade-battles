import React from 'react';
import {StyleSheet, View, Text, Image, Pressable} from 'react-native';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {RootStackParamList} from '../components/Navigator.navigation';
const backIconSrc = require('../../assets/icons/go_back_icon_black.png');
import type {ProfileScreenNavigationProp} from '../shared/Types';

export const BuySellStock: React.FC = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'BuySellStock'>>();
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const {stock} = route.params;

  return (
    <View style={styles.container}>
      <Pressable onPress={() => navigation.goBack()}>
        <Image style={styles.back} source={backIconSrc} />
      </Pressable>
      <Image
        style={styles.logo}
        source={{
          uri: `https://storage.googleapis.com/iexcloud-hl37opg/api/logos/${stock.symbol}.png`,
        }}
      />
      <Text style={styles.title}>{stock.symbol}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
  },
  logo: {
    width: '100%',
    height: 60,
  },
  back: {
    height: 30,
    width: 30,
  },
});
