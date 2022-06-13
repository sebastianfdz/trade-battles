import React from 'react';
import {View, Image, Text} from 'react-native';
import {Stock} from '../shared/Types';

export const WatchlistStockCard: React.FC<{stock: Stock}> = ({stock}) => {
  return (
    <View>
      <View>
        <Image
          style={{
            width: 40,
            height: 40,
            resizeMode: 'contain',
            borderRadius: 50,
          }}
          source={{
            uri: `https://storage.googleapis.com/iexcloud-hl37opg/api/logos/${stock.symbol}.png`,
          }}
        />
        <Text>{stock.symbol}</Text>
      </View>
    </View>
  );
};
