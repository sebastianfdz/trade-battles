import React from 'react';
import {StyleSheet, View, Text, Image, Pressable} from 'react-native';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {RootStackParamList} from '../shared/Types';
import type {ProfileScreenNavigationProp} from '../shared/Types';
import {theme} from '../shared/themes';
import {useState} from 'react';
import {useEffect} from 'react';

const backIconSrc = require('../../assets/icons/go_back_icon_black.png');

export const BuySellStock: React.FC = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'BuySellStock'>>();
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const {stock, shares_owned} = route.params;

  const [quantityAvailable, setQuantityAvailable] = useState(0);
  const [quantitySelected, setQuantitySelected] = useState(0);
  useEffect(() => {
    setQuantityAvailable(shares_owned);
  }, [quantitySelected]);

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
        style={{
          flexDirection: 'row',
          alignSelf: 'center',
          justifyContent: 'center',
          marginTop: 50,
        }}>
        <Text style={{alignSelf: 'center'}}>{stock.close}</Text>
        <Text>{quantitySelected}</Text>
        <View>
          <Pressable
            onPress={() => {
              if (quantitySelected < quantityAvailable) {
                setQuantitySelected(prevState => prevState + 1);
              }
            }}
            style={styles.qty}>
            <Text>+</Text>
          </Pressable>
          <Pressable
            onPress={() => {
              if (quantitySelected > 0) {
                setQuantitySelected(prevState => prevState - 1);
              }
            }}
            style={styles.qty}>
            <Text>-</Text>
          </Pressable>
        </View>
      </View>
      <Text style={{alignSelf: 'center'}}>
        {quantityAvailable} available to sell
      </Text>
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
    marginBottom: 50,
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
  qty: {
    padding: 5,
    backgroundColor: 'red',
  },
});
