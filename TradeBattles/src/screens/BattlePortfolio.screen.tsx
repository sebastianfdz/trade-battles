import React, {useEffect, useState} from 'react';
import {View, Text, FlatList} from 'react-native';
import {PortfolioStockCard} from '../components/PortfolioStockCard.component';
import {PortfolioStock} from '../shared/Types';
import {ApiClient} from '../services/ApiClient.service';
import {theme} from '../shared/themes';
import {BattlePortfolioHeader} from '../components/BattlePortfolioHeader.component';
import {GoBack} from '../components/GoBack.component';
import type {RootStackParamList} from '../shared/Types';
import {RouteProp, useRoute} from '@react-navigation/native';
import {PortfolioInitializer} from '../shared/EmptyInitializers';
import {StockSearch} from '../components/StockSearch.component';

export const BattlePortfolio: React.FC = () => {
  const [currentUserPortfolio, setCurrentUserPortfolio] =
    useState<PortfolioStock[]>(PortfolioInitializer);

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
  }, []);

  return (
    <View style={{flex: 1}}>
      <GoBack />
      <View
        style={{flex: 1, backgroundColor: theme.light_mode_white, padding: 10}}>
        <BattlePortfolioHeader battle={battle} />
        <StockSearch battle_id={battle.battle_id} user_id={user_id} />

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
