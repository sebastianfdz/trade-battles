import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, FlatList, TextInput} from 'react-native';
import {PortfolioStockCard} from '../components/PortfolioStockCard.component';
import {Stock} from '../shared/Types';
import {PortfolioStock} from '../shared/Types';
import {ApiClient} from '../services/ApiClient.service';
import {theme} from '../shared/themes';
import {BattlePortfolioHeader} from '../components/BattlePortfolioHeader.component';
import portfolio from '../portfolio.json';

export const BattlePortfolio: React.FC = () => {
  const [currentUserPortfolio, setCurrentUserPortfolio] = useState<
    PortfolioStock[]
  >([{price: 0, symbol: '', change: 0, quantity: 0, averageCost: 0}]);

  useEffect(() => {
    // const setPortfolio = async () => {
    //   await ApiClient.getUserPortfolio(
    //     'c3e56754-7abb-43d8-811d-52186035e1be',
    //     'cb08e42a-1b5c-48ba-85ff-fdba5fcf8ca6',
    //   ).then(res => {
    //     const portfolio: PortfolioStock[] = [];
    //     res.data.forEach(el => {
    //       ApiClient.getQuote(el.symbol).then(res => {
    //         el.price = res.data.close;
    //         el.change = ((el.price - el.averageCost) / el.averageCost) * 100;
    //         el.quote = res.data;
    //         portfolio.push(el);
    //         setCurrentUserPortfolio(portfolio);
    //         console.warn(currentUserPortfolio);
    //       });
    //     });
    //   });
    // };

    // setPortfolio();

    setCurrentUserPortfolio(portfolio);
  }, []);
  return (
    <View style={{flex: 1, backgroundColor: theme.light_mode_white}}>
      <BattlePortfolioHeader />
      <TextInput style={styles.input} placeholder="Search..."></TextInput>
      {currentUserPortfolio[0].price === 0 ? (
        <Text style={{alignSelf: 'center'}}>Loading...</Text>
      ) : (
        <View style={{flex: 1}}>
          <FlatList
            data={currentUserPortfolio}
            renderItem={({item}: {item: PortfolioStock}) => {
              return <PortfolioStockCard stock={item} />;
            }}
          />
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    padding: 20,
  },
  input: {
    width: 200,
    height: 50,
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 17,
  },
});
