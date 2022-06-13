import React, {useEffect, useState} from 'react';
import {FlatList, Text} from 'react-native';
import {Stock} from '../shared/Types';
import {StockInitializer} from '../shared/EmptyInitializers';
import {useUserContext} from '../App.provider';
import {ApiClient} from '../services/ApiClient.service';
import {WatchlistStockCard} from './WatchlistStockCard.component';

export const WatchlistList = () => {
  const userContext = useUserContext();
  const [watchlist, setWatchlist] = useState<Stock[]>([StockInitializer]);

  const getWatchlistArray = () => {
    const array = ApiClient.getUserById(userContext.user.id).then(
      res => res.data[0].watchlist,
    );
    return array;
  };

  const fetchWatchlistStocks = async () => {
    let watchlistStocks: Stock[] = [];
    const array = await getWatchlistArray();
    array.forEach(el =>
      ApiClient.getQuote(el.toLowerCase()).then(res => {
        watchlistStocks.push(res.data);
        setWatchlist(watchlistStocks);
      }),
    );
  };
  useEffect(() => {
    fetchWatchlistStocks();
  }, []);

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={watchlist}
      renderItem={({item}: {item: Stock}) => (
        <WatchlistStockCard stock={item} />
      )}
    />
  );
};
