import React from 'react';
import {StyleSheet, View, Text, Image, Pressable} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/native';
import {RootStackParamList} from '../shared/Types';
import {useState} from 'react';
import {useEffect} from 'react';
import {ApiClient} from '../services/ApiClient.service';
import {StockDetailsInfo} from '../components/StockDetailsInfo.component';
import {StockDetailsBuySell} from '../components/StockDetailsBuySell.component';
import {GoBack} from '../components/GoBack.component';
import {theme} from '../shared/themes';

export const StockDetails: React.FC = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'BuySellStock'>>();
  const {stock, shares_owned, average_cost, battle_id, user_id} = route.params;

  const [quantityAvailable, setQuantityAvailable] = useState(0);
  const [quantitySelected, setQuantitySelected] = useState(0);
  const [price, setPrice] = useState(
    stock.isUSMarketOpen ? stock.iexRealtimePrice : stock.close,
  );
  const [dayChange, setDayChange] = useState(stock.changePercent);
  const [ytdChange, setYtdChange] = useState(stock.ytdChange);
  const [buySellViewable, setBuySellViewable] = useState(false);
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

  return (
    <View style={{backgroundColor: theme.light_mode_white}}>
      <GoBack />
      <View style={styles.container}>
        <StockDetailsInfo
          stock={stock}
          price={price == null ? 0 : price}
          dayChange={dayChange}
          ytdChange={ytdChange}
        />

        <Pressable
          onPress={() => setBuySellViewable(!buySellViewable)}
          style={styles.trade_button}>
          <Text style={styles.trade_button_text}>Trade</Text>
        </Pressable>

        <Text style={{fontSize: 12, textAlign: 'center', marginTop: 5}}>
          Your average cost per share: ${average_cost.toFixed(2)}
        </Text>

        <StockDetailsBuySell
          setQuantitySelected={setQuantitySelected}
          quantitySelected={quantitySelected}
          setQuantityAvailable={setQuantityAvailable}
          quantityAvailable={quantityAvailable}
          setBuySellViewable={setBuySellViewable}
          buySellViewable={buySellViewable}
          price={price == null ? 0 : price}
          stock={stock}
          battle_id={battle_id}
          user_id={user_id}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  title: {
    fontSize: 15,
  },

  back: {
    height: 30,
    width: 30,
  },
  trade_button: {
    backgroundColor: theme.colorPrimary,
    width: '80%',
    height: 60,
    borderRadius: 15,
    padding: 10,
    marginTop: 35,
    justifyContent: 'center',
  },
  trade_button_text: {
    color: 'white',
    fontSize: 20,
    fontWeight: '800',
    textAlign: 'center',
  },
});
