import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TextInput,
  Image,
  Pressable,
} from 'react-native';
import {PortfolioStockCard} from '../components/PortfolioStockCard.component';
import {Battle, PortfolioStock} from '../shared/Types';
import {ApiClient} from '../services/ApiClient.service';
import {theme} from '../shared/themes';
import {BattlePortfolioHeader} from '../components/BattlePortfolioHeader.component';
import {GoBack} from '../components/GoBack.component';
import type {RootStackParamList} from '../shared/Types';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
// const {portfolio} = require('../portfolio.ts');
import {stockListForSearch} from '../stockListForSearch';
import type {ProfileScreenNavigationProp} from '../shared/Types';
import {portfolio} from '../portfolio';
import {Stock} from '../shared/Types';
import {
  PortfolioInitializer,
  StockInitializer,
} from '../shared/EmptyInitializers';

export const BattlePortfolio: React.FC = () => {
  const [currentUserPortfolio, setCurrentUserPortfolio] =
    useState<PortfolioStock[]>(PortfolioInitializer);

  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const route = useRoute<RouteProp<RootStackParamList, 'BattlePortfolio'>>();

  const {battle, user_id} = route.params;
  const [search, setSearch] = useState('');

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

  const handleSearch = (currentSearch: string) => {
    // console.warn(currentSearch);
    setSearch(currentSearch);
    console.warn(portfolio);
  };
  return (
    <View style={{flex: 1}}>
      <GoBack />
      <View
        style={{flex: 1, backgroundColor: theme.light_mode_white, padding: 10}}>
        <BattlePortfolioHeader battle={battle} />

        {/* --------------------------------------------------- Search --------------------------------------------------- */}
        <TextInput
          onChangeText={currentSearch => handleSearch(currentSearch)}
          style={styles.input}
          placeholder="Search..."></TextInput>

        <View style={{alignSelf: 'center'}}>
          {stockListForSearch
            .filter(item => {
              const lowercaseSearch = search.toLowerCase();
              const lowercaseTicker = item.ticker.toLowerCase();
              const lowercaseName = item.name.toLowerCase();

              return (
                lowercaseSearch &&
                (lowercaseTicker.startsWith(lowercaseSearch) ||
                  lowercaseName.startsWith(lowercaseSearch))
              );
            })
            .slice(0, 10)
            .map(item => {
              return (
                <Pressable
                  onPress={() => {
                    let stock: Stock = StockInitializer;
                    ApiClient.getQuote(item.ticker).then(res => {
                      (stock = res.data),
                        navigation.navigate('BuySellStock', {
                          stock: stock,
                          shares_owned: 0,
                          average_cost: 0,
                          battle_id: battle.battle_id,
                          user_id: user_id,
                        });
                    });
                  }}
                  style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Image
                    style={{width: 30, height: 30, borderRadius: 50}}
                    source={{
                      uri: `https://storage.googleapis.com/iexcloud-hl37opg/api/logos/${item.ticker}.png`,
                    }}
                  />
                  <Text
                    style={{
                      fontSize: 20,
                    }}>
                    {item.ticker}
                  </Text>
                </Pressable>
              );
            })}
        </View>
        {/* --------------------------------------------------- Search --------------------------------------------------- */}

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
