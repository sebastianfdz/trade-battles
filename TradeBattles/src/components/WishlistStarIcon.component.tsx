import React, {useEffect, useState} from 'react';
import {Pressable, Image} from 'react-native';
import {ApiClient} from '../services/ApiClient.service';
import {Stock} from '../shared/Types';
const greyStarSrc = require('../../assets/icons/star_grey_icon.png');
const yellowStarSrc = require('../../assets/icons/star_yellow_icon.png');

export const WishlistStarIcon: React.FC<{
  user_id: string;
  stock: Stock;
  size?: number;
}> = ({user_id, stock, size}) => {
  let useeffectpassed = false;
  const [isInWatchlist, setIsInWatchlist] = useState(false);

  useEffect(() => {
    useeffectpassed = true;
    ApiClient.getUserById(user_id).then(
      res =>
        res.data[0].watchlist.includes(stock.symbol) && setIsInWatchlist(true),
    );
  }, []);
  return (
    <Pressable
      onPress={() => {
        ApiClient.updateUserWatchlist(user_id, stock.symbol);
        setIsInWatchlist(!isInWatchlist);
      }}>
      <Image
        style={{width: size || 35, height: size || 35}}
        source={isInWatchlist ? yellowStarSrc : greyStarSrc}
      />
    </Pressable>
  );
};
