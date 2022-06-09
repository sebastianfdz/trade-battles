import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {Stock} from '../shared/Types';

export const StockSearch: React.FC<{stock: Stock; price: number}> = ({
  stock,
  price,
}) => {
  return (
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
      <Text style={styles.price}>${price > 0 ? price : stock.latestPrice}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  title: {
    fontSize: 15,
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 50,
  },
  price: {
    fontSize: 50,
    fontWeight: '700',
    marginBottom: 50,
    alignSelf: 'center',
  },
});
