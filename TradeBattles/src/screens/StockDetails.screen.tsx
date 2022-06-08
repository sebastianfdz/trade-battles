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

export const StockDetails: React.FC = ({}) => {
  const route = useRoute<RouteProp<RootStackParamList, 'BuySellStock'>>();
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

  return (
    <View>
      <GoBack />
      <View style={styles.container}>
        <StockDetailsInfo
          stock={stock}
          price={price == null ? 0 : price}
          dayChange={dayChange}
          ytdChange={ytdChange}
        />

        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 30,
          }}>
          <Text>Your average cost per share: ${average_cost.toFixed(2)}</Text>
          <Text style={{marginTop: 10}}>
            Gain / Loss ={' '}
            {(
              (price == null ? 0 : price - average_cost) * quantitySelected
            ).toFixed(2)}
          </Text>
        </View>

        <StockDetailsBuySell
          price={price == null ? 0 : price}
          quantitySelected={quantitySelected}
          quantityAvailable={quantityAvailable}
          setQuantitySelected={setQuantitySelected}
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
});
