import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {useUserContext} from '../App.provider';
import {ApiClient} from '../services/ApiClient.service';
import {StockInitializer} from '../shared/EmptyInitializers';
import {Stock} from '../shared/Types';

export const WatchList = () => {
  const [watchlistArray, setWatchlistArray] = useState<string[]>([]);
  const [watchlist, setWatchlist] = useState<Stock[]>([StockInitializer]);

  const userContext = useUserContext();
  useEffect(() => {
    ApiClient.getUserById(userContext.user.id).then(res => {
      setWatchlistArray(res.data[0].watchlist);
      return res.data[0].watchlist;
    });
  });

  useEffect(() => {
    let watchlistStocks: Stock[] = [];
    watchlistArray.length > 0 &&
      watchlistArray.map(el =>
        ApiClient.getQuote(el.toLowerCase()).then(res =>
          watchlistStocks.push(res.data),
        ),
      );
    setWatchlist(watchlistStocks);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={{fontSize: 30, fontWeight: '600'}}>Watchlist</Text>
      {watchlist.map(el => (
        <View>
          <Image
            style={{
              width: 40,
              height: 40,
              resizeMode: 'contain',
              borderRadius: 50,
            }}
            source={{
              uri: `https://storage.googleapis.com/iexcloud-hl37opg/api/logos/${el.symbol}.png`,
            }}
          />
          <Text>{el.symbol}</Text>
        </View>
      ))}
      {/* <Text>WATCHLIST SCREEN</Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
