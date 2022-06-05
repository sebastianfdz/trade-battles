import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {theme} from '../shared/themes';
import type {Stock} from '../shared/Types';
import {PortfolioStock} from '../shared/Types';

export const PortfolioStockCard: React.FC<PortfolioStock> = ({stock}) => {
  return (
    <View style={styles.container}>
      <View style={styles.logo_container}>
        <Image
          style={styles.logo}
          source={{
            uri: `https://storage.googleapis.com/iexcloud-hl37opg/api/logos/${stock.symbol}.png`,
          }}
        />
      </View>
      <Text style={styles.text}>{stock.symbol}</Text>
      <Text
        style={[
          styles.change,
          {color: stock.change > 0 ? theme.primary_green : theme.primary_red},
        ]}>
        {stock.change.toFixed(2)}%
      </Text>
      <View style={styles.price_owned}>
        <Text style={styles.price}>${stock.price.toFixed(2)}</Text>
        <Text style={styles.owned}>{stock.quantity} owned</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderBottomWidth: 0.3,
    borderBottomColor: theme.greyPrimary,
    backgroundColor: theme.stockCardBackground,
  },
  logo_container: {
    height: 30,
    width: 30,
  },
  logo: {
    height: '100%',
    width: '100%',
  },
  text: {
    color: theme.colorPrimary,
  },
  price: {
    color: theme.colorPrimary,
    fontSize: 17,
    fontWeight: '700',
  },
  change: {
    fontWeight: '700',
  },
  price_owned: {
    alignItems: 'flex-end',
  },
  owned: {
    fontSize: 12,
    color: theme.colorPrimary,
  },
});
