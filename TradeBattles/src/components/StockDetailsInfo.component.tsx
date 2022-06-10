import React, {useEffect, useState} from 'react';
import {View, Text, Image, StyleSheet, Dimensions} from 'react-native';
import {GraphPoint, Stock} from '../shared/Types';
import {theme} from '../shared/themes';
const {
  ChartDot,
  ChartPath,
  ChartPathProvider,
  ChartYLabel,
} = require('@rainbow-me/animated-charts');
import {ApiClient} from '../services/ApiClient.service';

const SCREEN_WIDTH = Dimensions.get('window').width;
export const StockDetailsInfo: React.FC<{
  stock: Stock;
  price: number;
  dayChange: number;
  ytdChange: number;
}> = ({stock, price, dayChange, ytdChange}) => {
  const now = Date.now();

  const [graphPoints, setGraphPoints] = useState<GraphPoint[]>([]);

  useEffect(() => {
    const getHistoricals = async () => {
      await ApiClient.getHistoricalData(
        stock.symbol,
        'day',
        1,
        now - 31556952000,
        now,
      ).then(res => setGraphPoints(res.data.results));
    };
    getHistoricals();
  }, []);

  const formatCurrency = (value: any) => {
    'worklet';
    if (value === '') {
      return `$${(price > 0 ? price : stock.latestPrice).toFixed(2)}`;
    }
    return `$${parseFloat(value).toFixed(2)}`;
  };
  const return_color_day_change =
    dayChange > 0 ? theme.primary_green : theme.primary_red;

  const return_color_ytd_change =
    ytdChange > 0 ? theme.primary_green : theme.primary_red;

  return (
    <View
      style={{
        width: SCREEN_WIDTH,
      }}>
      <ChartPathProvider
        data={{
          points: graphPoints.map(price => ({x: price.t, y: price.vw})),
          smoothingStrategy: 'bezier',
        }}>
        <View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 20,
            }}>
            <Image
              style={[styles.logo]}
              source={{
                uri: `https://storage.googleapis.com/iexcloud-hl37opg/api/logos/${stock.symbol}.png`,
              }}
            />
            <Text style={styles.title}>{stock.symbol}</Text>
          </View>
        </View>
        {/* -------------------------------------------------------CHANGES----------------------------------------------------------- */}

        <View>
          <ChartYLabel format={formatCurrency} style={styles.price} />
        </View>

        <View
          style={{
            // backgroundColor: theme.greyPrimary,
            borderRadius: 15,
            // padding: 20,
          }}>
          {/* <Text style={styles.price}>
            ${price > 0 ? price : stock.latestPrice}
          </Text> */}
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
          <View>
            <ChartPath
              height={SCREEN_WIDTH / 2}
              stroke={'red'}
              strokeWidth={0.5}
              selectedStrokeWidth={10}
              width={SCREEN_WIDTH}
            />

            <ChartDot
              style={{
                backgroundColor: 'red',
              }}
            />
          </View>
        </View>
      </ChartPathProvider>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 25,
    textAlign: 'center',
    fontWeight: '800',
    marginLeft: 12,
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
  // price: {
  //   color: 'white',
  //   fontSize: 40,
  //   fontWeight: 'bold',
  // },
  name: {
    color: 'white',
    fontSize: 20,
  },
  body_container: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  return_percentage: {color: 'white', fontSize: 18, fontWeight: 'bold'},
  return_container: {
    padding: 5,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 7,
  },
});
