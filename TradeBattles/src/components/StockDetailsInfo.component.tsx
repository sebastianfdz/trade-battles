import React from 'react';
import {View, Text, Image, StyleSheet, Pressable} from 'react-native';
import {Stock} from '../shared/Types';
import {theme} from '../shared/themes';
import {StockSearch} from './StockSearch.component';

export const StockDetailsInfo: React.FC<{
  stock: Stock;
  price: number;
  dayChange: number;
  ytdChange: number;
}> = ({stock, price, dayChange, ytdChange}) => {
  const return_color_day_change =
    dayChange > 0 ? theme.primary_green : theme.primary_red;

  const return_color_ytd_change =
    ytdChange > 0 ? theme.primary_green : theme.primary_red;
  return (
    <View>
      <StockSearch stock={stock} price={price} />
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
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 15,
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 50,
  },
  price: {
    fontSize: 50,
    fontWeight: '700',
    marginBottom: 50,
    alignSelf: 'center',
  },
  change_container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
});
