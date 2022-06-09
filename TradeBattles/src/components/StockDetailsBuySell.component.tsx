import React from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import {ApiClient} from '../services/ApiClient.service';
import {theme} from '../shared/themes';
import {Stock} from '../shared/Types';

export const StockDetailsBuySell: React.FC<{
  price: number;
  quantitySelected: number;
  quantityAvailable: number;
  setQuantitySelected: React.Dispatch<React.SetStateAction<number>>;
  stock: Stock;
  battle_id: string;
  user_id: string;
}> = ({
  price,
  quantitySelected,
  quantityAvailable,
  setQuantitySelected,
  stock,
  battle_id,
  user_id,
}) => {
  return (
    <View>
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
            $
            {(price > 0 ? price : stock.latestPrice * quantitySelected).toFixed(
              2,
            )}
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
                  // if (quantitySelected < quantityAvailable) {
                  setQuantitySelected(prevState => prevState + 1);
                  // }
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

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          padding: 30,
        }}>
        <Pressable
          onPress={() => {
            ApiClient.postTransaction({
              battle_id,
              user_id,
              action: 'SELL',
              symbol: stock.symbol,
              price: price > 0 ? price : stock.latestPrice,
              quantity: quantitySelected,
            });
          }}
          style={[styles.button, {backgroundColor: theme.primary_yellow}]}>
          <Text style={styles.button_text}>Sell</Text>
        </Pressable>
        <Pressable
          style={[styles.button, {backgroundColor: theme.primary_green}]}
          onPress={() => {
            ApiClient.postTransaction({
              battle_id,
              user_id,
              action: 'BUY',
              symbol: stock.symbol,
              price: price > 0 ? price : stock.latestPrice,
              quantity: quantitySelected,
            });
          }}>
          <Text style={[styles.button_text, {color: 'white'}]}>Buy</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
