import React from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';
import {useUserContext} from '../App.provider';
import {formatter} from '../shared/Methods';
import {theme} from '../shared/themes';
import {Stock} from '../shared/Types';
import {WishlistStarIcon} from './WishlistStarIcon.component';

export const WatchlistStockCard: React.FC<{stock: Stock}> = ({stock}) => {
  const userContext = useUserContext();
  const return_color_day_change =
    stock.change > 0 ? theme.primary_green : theme.primary_red;
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottomColor: theme.colorPrimary,
          borderBottomWidth: 0.3,
          padding: 10,
        }}>
        <Image
          style={{
            width: 30,
            height: 30,
            resizeMode: 'contain',
            borderRadius: 50,
          }}
          source={{
            uri: `https://storage.googleapis.com/iexcloud-hl37opg/api/logos/${stock.symbol}.png`,
          }}
        />
        <Text style={{color: theme.colorPrimary}}>{stock.symbol}</Text>
        <View
          style={{
            padding: 4,
            backgroundColor: return_color_day_change,
            borderRadius: 5,
          }}>
          <Text style={{color: 'white', fontWeight: '600', fontSize: 12}}>
            {(stock.changePercent * 100).toFixed(2)}%
          </Text>
        </View>
        <Text style={{fontWeight: '600', color: theme.colorPrimary}}>
          {formatter.format(
            stock.iexRealtimePrice ? stock.iexRealtimePrice : stock.latestPrice,
          )}
        </Text>
        <WishlistStarIcon
          user_id={userContext.user.id}
          size={20}
          stock={stock}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'red',
    // margin: 5,
    width: '80%',
    alignSelf: 'center',
  },
});
