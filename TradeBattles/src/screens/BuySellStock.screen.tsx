import React from 'react';
import {StyleSheet, View, Text, Image, Pressable} from 'react-native';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {RootStackParamList} from '../shared/Types';
import type {ProfileScreenNavigationProp} from '../shared/Types';
import {theme} from '../shared/themes';
import {useState} from 'react';
import {useEffect} from 'react';
import {ApiClient} from '../services/ApiClient.service';

const backIconSrc = require('../../assets/icons/go_back_icon_black.png');

export const BuySellStock: React.FC = ({}) => {
  const route = useRoute<RouteProp<RootStackParamList, 'BuySellStock'>>();
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const {stock, shares_owned, average_cost, battle_id, user_id} = route.params;
  const [quantityAvailable, setQuantityAvailable] = useState(0);
  const [quantitySelected, setQuantitySelected] = useState(0);
  const [price, setPrice] = useState(
    stock.isUSMarketOpen ? stock.iexRealtimePrice : stock.close,
  );
  const [dayChange, setDayChange] = useState(stock.changePercent);
  const [ytdChange, setYtdChange] = useState(stock.ytdChange);
  useEffect(() => {
    setQuantityAvailable(shares_owned);
  }, [quantitySelected]);

  useEffect(() => {
    // const fetchPrice = async () => {
    //   await ApiClient.getQuote(stock.symbol).then(res => {
    //     setPrice(res.data.iexRealtimePrice);
    //     setDayChange(res.data.changePercent);
    //     setYtdChange(res.data.ytdChange);
    //   });
    // };
    // fetchPrice();
    // setInterval(() => fetchPrice(), 2000);
  }, []);

  const return_color_day_change =
    dayChange > 0 ? theme.primary_green : theme.primary_red;

  const return_color_ytd_change =
    ytdChange > 0 ? theme.primary_green : theme.primary_red;

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
        <Text style={styles.price}>${price}</Text>
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
              backgroundColor: return_color_day_change,
            }}>
            <Text style={{color: 'white', fontWeight: '700'}}>
              {(dayChange * 100).toFixed(2)}%
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
              backgroundColor: return_color_ytd_change,
            }}>
            <Text style={{color: 'white', fontWeight: '700'}}>
              {(ytdChange * 100).toFixed(2)}%
            </Text>
          </View>
        </View>
      </View>
      {/* -------------------------------------------------------AVERAGE COST----------------------------------------------------------- */}

      <View
        style={{justifyContent: 'center', alignItems: 'center', marginTop: 30}}>
        <Text>Your average cost per share: ${average_cost.toFixed(2)}</Text>
        <Text style={{marginTop: 10}}>
          Gain / Loss = {((price - average_cost) * quantitySelected).toFixed(2)}
        </Text>
      </View>

      {/* -------------------------------------------------------BUY QUANTITY----------------------------------------------------------- */}
      <View
        style={{
          flexDirection: 'row',
          paddingHorizontal: 100,
          justifyContent: 'space-between',
          marginTop: 50,
        }}>
        <View>
          <Text style={{marginBottom: 3}}>TOTAL</Text>
          <Text style={{alignSelf: 'center', fontSize: 30}}>
            ${(price * quantitySelected).toFixed(2)}
          </Text>
        </View>
        <View>
          <Text style={{marginLeft: 'auto', marginBottom: 3}}>QTY</Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginLeft: 10,
            }}>
            <Text style={{fontSize: 18, marginRight: 5}}>
              {quantitySelected}
            </Text>
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
          onPress={() => {
            ApiClient.postTransaction(
              battle_id,
              user_id,
              'SELL',
              stock.symbol,
              price,
              quantitySelected,
            );
          }}
          style={[styles.button, {backgroundColor: theme.primary_yellow}]}>
          <Text style={styles.button_text}>Sell</Text>
        </Pressable>
        <Pressable
          style={[styles.button, {backgroundColor: theme.primary_green}]}
          onPress={() => {
            ApiClient.postTransaction(
              battle_id,
              user_id,
              'BUY',
              stock.symbol,
              price,
              quantitySelected,
            );
          }}>
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
    // marginBottom: 20,
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
    padding: 3,
    backgroundColor: 'grey',
    borderRadius: 15,
  },
});
