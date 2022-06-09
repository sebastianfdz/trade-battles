import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  Dimensions,
} from 'react-native';
import {Stock} from '../shared/Types';
import {theme} from '../shared/themes';

const SCREEN_WIDTH = Dimensions.get('window').width;

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
    <View
      style={{
        backgroundColor: theme.greyPrimary,
        borderRadius: 30,
        paddingVertical: 15,
        width: SCREEN_WIDTH * 0.85,
      }}>
      <View>
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
          ${price > 0 ? price : stock.latestPrice}
        </Text>
      </View>
      {/* -------------------------------------------------------CHANGES----------------------------------------------------------- */}
      <View
        style={{
          flexDirection: 'row',
          alignSelf: 'center',
        }}>
        <View style={styles.change_container}>
          <Text style={styles.change_text}>Day Change</Text>
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
          <Text style={styles.change_text}>YTD Change</Text>
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
    fontSize: 17,
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 50,
  },
  price: {
    fontSize: 45,
    fontWeight: '700',
    marginBottom: 20,
    alignSelf: 'center',
  },
  change_container: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
    marginHorizontal: 12,
  },
  change_text: {
    fontSize: 15,
    marginBottom: 5,
  },
});
