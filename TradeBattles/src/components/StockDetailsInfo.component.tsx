import React, {useEffect, useState} from 'react';
import {View, Text, Image, StyleSheet, Dimensions} from 'react-native';
import {GraphPoint, Stock} from '../shared/Types';
import {theme} from '../shared/themes';
import LottieView from 'lottie-react-native';
const {
  ChartDot,
  ChartPath,
  ChartPathProvider,
  ChartYLabel,
} = require('@rainbow-me/animated-charts');
import {ApiClient} from '../services/ApiClient.service';
const spinnerSrc = require('../../assets/lotties/spinner.json');

const SCREEN_WIDTH = Dimensions.get('window').width;
export const StockDetailsInfo: React.FC<{
  stock: Stock;
  price: number;
  dayChange: number;
  ytdChange: number;
}> = ({stock, price, dayChange, ytdChange}) => {
  price =
    price > 0
      ? price
      : stock.iexRealtimePrice
      ? stock.iexRealtimePrice
      : stock.latestPrice;
  const [graphPoints, setGraphPoints] = useState<GraphPoint[]>([
    {vw: -1, t: 0},
  ]);

  useEffect(() => {
    const getHistoricals = async () => {
      const now = Date.now();
      const oneYearInMiliseconds = 31556952000;
      await ApiClient.getHistoricalData(
        stock.symbol,
        'day',
        1,
        now - oneYearInMiliseconds,
        now,
      ).then(res => setGraphPoints(res.data.results));
    };
    getHistoricals();
  }, []);

  const formatCurrency = (value: any) => {
    'worklet';
    if (value === '') {
      return `$${price.toFixed(2)}`;
    }
    return `$${parseFloat(value).toFixed(2)}`;
  };
  const return_color_day_change =
    dayChange > 0 ? theme.primary_green : theme.primary_red;
  const return_color_ytd_change =
    ytdChange > 0 ? theme.primary_green : theme.primary_red;
  const return_color_graph =
    price > graphPoints[0].vw ? theme.primary_green : theme.primary_red;

  return (
    <View
      style={{
        width: SCREEN_WIDTH,
      }}>
      <ChartPathProvider
        data={{
          points: graphPoints.map(point => ({x: point.t, y: point.vw})),
          smoothingStrategy: 'bezier',
        }}>
        <View>
          <View style={styles.logo_ticker_header}>
            <Image
              style={[styles.logo, {resizeMode: 'contain'}]}
              source={{
                uri: `https://storage.googleapis.com/iexcloud-hl37opg/api/logos/${stock.symbol}.png`,
              }}
            />
            <Text style={styles.title}>{stock.symbol}</Text>
          </View>
        </View>

        <View>
          <ChartYLabel format={formatCurrency} style={styles.price} />
        </View>

        <View style={styles.changes_row}>
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

        <View style={styles.graph_container}>
          {graphPoints[0].vw > -1 ? (
            <ChartPath
              height={SCREEN_WIDTH / 2}
              stroke={return_color_graph}
              strokeWidth={1}
              width={SCREEN_WIDTH}
            />
          ) : (
            <View style={{alignSelf: 'center'}}>
              <View style={{width: 200, height: 200, padding: -10}}>
                <LottieView source={spinnerSrc} autoPlay loop={false} />
              </View>
            </View>
          )}
          <ChartDot
            style={{
              backgroundColor: return_color_graph,
            }}
          />
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
  logo_ticker_header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  changes_row: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  graph_container: {},
});
