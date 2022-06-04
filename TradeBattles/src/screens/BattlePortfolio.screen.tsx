import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, FlatList} from 'react-native';
import {PortfolioStockCard} from '../components/PortfolioStockCard.component';
import {Stock} from '../shared/Types';
import {PortfolioStock} from '../shared/Types';
import {ApiClient} from '../services/ApiClient.service';

export const BattlePortfolio: React.FC = () => {
  const [currentUserPortfolio, setCurrentUserPortfolio] = useState<
    PortfolioStock[]
  >([]);

  useEffect(() => {
    let stock_list = [];
    const getPortfolio = async () => {
      stock_list = await ApiClient.getUserPortfolio(
        'c3e56754-7abb-43d8-811d-52186035e1be',
        'cb08e42a-1b5c-48ba-85ff-fdba5fcf8ca6',
      )
        .then(res => res.json())
        .then(data => setCurrentUserPortfolio(data));
    };
    getPortfolio();
  }, []);
  return (
    <View>
      {/* <View style={styles.column_names_container}>
        <Text style={styles.column_name}>TICKER</Text>
        <Text style={styles.column_name}>PRICE</Text>
        <Text style={styles.column_name}>CHANGE%</Text>
        <Text style={styles.column_name}>OWNED</Text>
      </View> */}
      <FlatList
        style={styles.container}
        data={currentUserPortfolio}
        renderItem={({item}: {item: PortfolioStock}) => {
          return <PortfolioStockCard stock={item} />;
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    // padding: 20,
  },
  column_names_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // paddingLeft: 100,
  },
  column_name: {
    fontSize: 15,
    fontWeight: '700',
  },
});
