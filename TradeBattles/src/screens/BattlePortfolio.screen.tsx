import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, FlatList, TextInput} from 'react-native';
import {PortfolioStockCard} from '../components/PortfolioStockCard.component';
import {Battle, PortfolioStock} from '../shared/Types';
import {ApiClient} from '../services/ApiClient.service';
import {theme} from '../shared/themes';
import {BattlePortfolioHeader} from '../components/BattlePortfolioHeader.component';
import {GoBack} from '../components/GoBack.component';
import type {RootStackParamList} from '../shared/Types';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
// const {portfolio} = require('../portfolio.ts');

const initialPortfolioState = {
  price: 0,
  symbol: '',
  change: 0,
  quantity: 0,
  averageCost: 0,
  quote: {
    open: 0,
    close: 0,
    change: 0,
    changePercent: 0,
    currency: '',
    companyName: '',
    iexAskPrice: 0,
    iexBidPrice: 0,
    symbol: '',
    peRatio: 0,
    ytdChange: 0,
    week52High: 0,
    week52Low: 0,
    previousClose: 0,
    low: 0,
    high: 0,
    iexRealtimePrice: 0,
    primaryExchange: '',
    isUSMarketOpen: false,
    // iexClose: 0,
    latestPrice: 0,
  },
};

export const BattlePortfolio: React.FC = () => {
  const [currentUserPortfolio, setCurrentUserPortfolio] = useState<
    PortfolioStock[]
  >([initialPortfolioState]);

  const route = useRoute<RouteProp<RootStackParamList, 'BattlePortfolio'>>();

  const {battle, user_id} = route.params;

  useEffect(() => {
    const setPortfolio = async () => {
      await ApiClient.getUserPortfolio(user_id, battle.battle_id).then(res => {
        const portfolio: PortfolioStock[] = [];
        res.data.forEach(el => {
          ApiClient.getQuote(el.symbol).then(res => {
            el.price = res.data.close ? res.data.close : res.data.latestPrice;
            el.change = ((el.price - el.averageCost) / el.averageCost) * 100;
            el.quote = res.data;
            portfolio.push(el);
            setCurrentUserPortfolio(portfolio);
          });
        });
      });
    };

    setPortfolio();

    // setCurrentUserPortfolio(portfolio);
  }, []);
  return (
    <View style={{flex: 1}}>
      <GoBack />
      <View
        style={{flex: 1, backgroundColor: theme.light_mode_white, padding: 10}}>
        <BattlePortfolioHeader battle={battle} />
        <TextInput style={styles.input} placeholder="Search..."></TextInput>
        {currentUserPortfolio[0].price === 0 ? (
          <Text style={{alignSelf: 'center'}}>Loading...</Text> // TODO -> Refactor to spinner
        ) : (
          <View style={{flex: 1}}>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={
                currentUserPortfolio.length ? currentUserPortfolio : undefined
              }
              renderItem={({item}: {item: PortfolioStock}) => {
                return (
                  <PortfolioStockCard
                    battleid={battle.battle_id}
                    userid={user_id}
                    stock={item}
                  />
                );
              }}
            />
          </View>
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    padding: 10,
  },
  input: {
    width: 200,
    height: 50,
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 17,
  },
});
