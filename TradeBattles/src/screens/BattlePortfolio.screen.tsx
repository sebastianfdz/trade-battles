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
  const battleHasStarted = Number(battle.start_date_timestamp) < Date.now();
  const startDate = new Date(Number(battle.start_date_timestamp)).toString();
  const endDate = new Date(Number(battle.end_date_timestamp)).toString();
  const [nonLockedGainLoss, setNonLockedGainLoss] = useState(0);
  let profit = 0;

  const setPortfolio = async () => {
    await ApiClient.getUserPortfolio(user_id, battle.battle_id).then(res => {
      const portfolio: PortfolioStock[] = [];
      res.data.forEach(el => {
        ApiClient.getQuote(el.symbol).then(res => {
          el.price = res.data.close ? res.data.close : res.data.latestPrice;
          el.change = ((el.price - el.averageCost) / el.averageCost) * 100;
          el.quote = res.data;
          profit += (el.price - el.averageCost) * el.quantity;
          setNonLockedGainLoss(
            prevstate =>
              (prevstate += (el.price - el.averageCost) * el.quantity),
          );
          el.quantity > 0 && portfolio.push(el);
          setCurrentUserPortfolio(portfolio);
        });
      });
    });
  };

  useEffect(() => {
    setPortfolio();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      ApiClient.updateUserProfit(user_id, profit, battle.battle_id);
    }, 3000);
  }, []);

  return (
    <View style={{flex: 1}}>
      <GoBack />
      <View style={{alignSelf: 'center'}}>
        {battleHasStarted ? (
          <Text
            style={{
              fontFamily: theme.fontFamilyRegular,
              fontSize: 12,
              color: theme.colorPrimary,
            }}>
            Battle ends on {endDate.split('GMT')[0]}
          </Text>
        ) : (
          <Text
            style={{
              fontFamily: theme.fontFamilyRegular,
              fontSize: 12,
              color: theme.colorPrimary,
            }}>
            Battle starts on {startDate.split('GMT')[0]}
          </Text>
        )}
      </View>

      <View
        style={{flex: 1, backgroundColor: theme.light_mode_white, padding: 10}}>
        <BattlePortfolioHeader
          battle={battle}
          currentGainLoss={nonLockedGainLoss}
        />

        <StockSearch
          battle_id={battle.battle_id}
          user_id={user_id}
          currentUserPortfolio={currentUserPortfolio}
          setCurrentUserPortfolio={setCurrentUserPortfolio}
        />

        {currentUserPortfolio[0].price === 0 ? (
          <Text style={{alignSelf: 'center'}}>Loading...</Text> // TODO -> Refactor to spinner
        ) : (
          <View style={{flex: 1}}>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={currentUserPortfolio}
              renderItem={({item}: {item: PortfolioStock}) => (
                <PortfolioStockCard
                  battleid={battle.battle_id}
                  userid={user_id}
                  stock={item}
                  currentUserPortfolio={currentUserPortfolio}
                  setCurrentUserPortfolio={setCurrentUserPortfolio}
                />
              )}
            />
          </View>
        )}
      </View>
    </View>
  );
};
