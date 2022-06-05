import React from 'react';
import {StyleSheet, View, Text, Image, Pressable} from 'react-native';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {RootStackParamList} from '../components/Navigator.navigation';
const backIconSrc = require('../../assets/icons/go_back_icon_black.png');
import type {ProfileScreenNavigationProp} from '../shared/Types';
import {theme} from '../shared/themes';

export const BuySellStock: React.FC = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'BuySellStock'>>();
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const {stock} = route.params;

  const return_color =
    stock.changePercent > 0 ? theme.primary_green : theme.primary_red;
  return (
    <View>
      {/* ---------------------------------------------------HEADER--------------------------------------------------------------- */}

      <Pressable
        onPress={() => navigation.goBack()}
        style={{padding: 15, marginTop: 60}}>
        <Image style={styles.back} source={backIconSrc} />
      </Pressable>
      <View style={styles.container}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 20,
          }}>
          <Image
            style={[styles.logo, {marginBottom: 20}]}
            source={{
              uri: `https://storage.googleapis.com/iexcloud-hl37opg/api/logos/${stock.symbol}.png`,
            }}
          />
          <Text style={styles.title}>{stock.companyName}</Text>
        </View>
        <Text style={styles.price}>
          ${stock.isUSMarketOpen ? stock.iexRealtimePrice : stock.close}
        </Text>
      </View>
      {/* -------------------------------------------------------CHANGES----------------------------------------------------------- */}
      <View>
        <View style={styles.change_container}>
          <Text style={{fontSize: 25, fontWeight: '200', marginRight: 10}}>
            Day Change
          </Text>
          <View
            style={{
              borderRadius: 10,
              padding: 5,
              backgroundColor: return_color,
            }}>
            <Text style={{color: 'white', fontWeight: '700'}}>
              {(stock.changePercent * 100).toFixed(2)}%
            </Text>
          </View>
        </View>
        <View style={styles.change_container}>
          <Text style={{fontSize: 25, fontWeight: '200', marginRight: 10}}>
            YTD Change
          </Text>
          <View
            style={{
              borderRadius: 10,
              padding: 5,
              backgroundColor: return_color,
            }}>
            <Text style={{color: 'white', fontWeight: '700'}}>
              {(stock.ytdChange * 100).toFixed(2)}%
            </Text>
          </View>
        </View>
      </View>
      {/* -------------------------------------------------------BUY QUANTITY----------------------------------------------------------- */}
      <View
        style={{alignSelf: 'center', justifyContent: 'center', marginTop: 50}}>
        <Text>-------------------------</Text>
        <Text style={{alignSelf: 'center'}}>HERE YOU BUY</Text>
        <Text>-------------------------</Text>
      </View>
      {/* -------------------------------------------------------BUY / SELL BUTTONS----------------------------------------------------------- */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          padding: 30,
        }}>
        <Pressable
          style={[styles.button, {backgroundColor: theme.primary_yellow}]}>
          <Text style={styles.button_text}>Sell</Text>
        </Pressable>
        <Pressable
          style={[styles.button, {backgroundColor: theme.primary_green}]}>
          <Text style={[styles.button_text, {color: 'white'}]}>Buy</Text>
        </Pressable>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    marginBottom: 20,
  },
  title: {
    fontSize: 15,
    // marginLeft: 20,
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 50,
  },
  back: {
    height: 30,
    width: 30,
  },
  price: {
    fontSize: 50,
    fontWeight: '700',
  },
  change_container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  button: {
    padding: 10,
    width: 150,
    borderRadius: 10,
  },
  button_text: {
    textAlign: 'center',

    fontSize: 30,
    fontWeight: '600',
  },
});
