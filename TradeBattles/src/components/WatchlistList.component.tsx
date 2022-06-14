import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import {Stock} from '../shared/Types';
import {StockInitializer} from '../shared/EmptyInitializers';
import {useUserContext} from '../App.provider';
import {ApiClient} from '../services/ApiClient.service';
import {WatchlistStockCard} from './WatchlistStockCard.component';

export const WatchlistList = () => {
  const userContext = useUserContext();
  const [watchlist, setWatchlist] = useState<Stock[]>([StockInitializer]);

  const getWatchlistArray = () => {
    const array = ApiClient.getUserById(userContext.user.id).then(res => {
      // console.warn(res.data[0].watchlist, 'list component');
      return res.data[0].watchlist;
    });
    return array;
  };

  const fetchWatchlistStocks = async () => {
    let watchlistStocks: Stock[] = [];
    const array = await getWatchlistArray();
    await Promise.all(
      array.map(async el => {
        const response = await ApiClient.getQuote(el.toLowerCase());
        watchlistStocks.push(response.data);
      }),
    );
    // console.warn(watchlistStocks, 'array');
    setWatchlist(watchlistStocks);
  };

  useEffect(() => {
    fetchWatchlistStocks();
  }, []);

  // useEffect(() => {
  //   console.warn(watchlist.map(el => el.symbol));
  // }, [watchlist]);

  return (
    <FlatList
      style={{width: '100%'}}
      showsVerticalScrollIndicator={false}
      data={watchlist}
      renderItem={({item}: {item: Stock}) => (
        <WatchlistStockCard stock={item} />
      )}
    />
  );
};
