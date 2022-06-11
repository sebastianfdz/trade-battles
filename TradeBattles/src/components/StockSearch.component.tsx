import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  Pressable,
  Dimensions,
} from 'react-native';
import {Stock} from '../shared/Types';
import {stockListForSearch} from '../stockListForSearch';
import {StockInitializer} from '../shared/EmptyInitializers';
import {ApiClient} from '../services/ApiClient.service';
import type {ProfileScreenNavigationProp} from '../shared/Types';
import {useNavigation} from '@react-navigation/native';
import {theme} from '../shared/themes';
import {CustomModal} from './CustomModal';

const SEARCH_TERM_WIDTH = Dimensions.get('window').width * 0.8;
export const StockSearch: React.FC<{battle_id: string; user_id: string}> = ({
  battle_id,
  user_id,
}) => {
  const [search, setSearch] = useState('');
  const [badSearch, setBadSearch] = useState(false);
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const handleSearch = (currentSearch: string) => {
    setSearch(currentSearch);
  };
  const textLengthLimit = 35;
  return (
    <>
      <CustomModal
        text={`'${search}' ticker not found. Try searching for another stock ticker.`}
        viewable={badSearch}
        setViewable={setBadSearch}
      />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          alignSelf: 'center',
          marginVertical: 15,
        }}>
        <TextInput
          onChangeText={currentSearch => handleSearch(currentSearch)}
          style={styles.input}
          placeholder="Search stock market..."
        />
        <Pressable
          style={{
            backgroundColor: theme.colorPrimary,
            padding: 10,
            borderRadius: 7,
          }}
          onPress={() => {
            let stock: Stock = StockInitializer;
            ApiClient.getQuote(search)
              .then(res => {
                (stock = res.data),
                  navigation.navigate('BuySellStock', {
                    stock: stock,
                    shares_owned: 0, // TODO -> Refactor to be dynamic with api call
                    average_cost: 0, // TODO -> Refactor to be dynamic with api call
                    battle_id,
                    user_id,
                  });
              })
              .catch(error => {
                setBadSearch(true);
              });
          }}>
          <Text style={{fontWeight: 'bold', color: theme.light_mode_white}}>
            Search
          </Text>
        </Pressable>
      </View>
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
                        shares_owned: 0, // TODO -> Refactor to be dynamic with api call
                        average_cost: 0, // TODO -> Refactor to be dynamic with api call
                        battle_id,
                        user_id,
                      });
                  });
                }}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  borderBottomColor: theme.colorPrimary,
                  borderBottomWidth: 0.3,
                  margin: 2,
                  width: SEARCH_TERM_WIDTH,
                  alignItems: 'center',
                  overflow: 'hidden',
                  backgroundColor: theme.stockCardBackground,
                }}>
                <Image
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 50,
                    marginBottom: 5,
                    resizeMode: 'contain',
                  }}
                  source={{
                    uri: `https://storage.googleapis.com/iexcloud-hl37opg/api/logos/${item.ticker}.png`,
                  }}
                />
                <Text
                  style={{
                    fontSize: 15,
                    marginLeft: 5,
                    marginBottom: 5,
                    color: theme.colorPrimary,
                  }}>
                  {item.name.length > textLengthLimit
                    ? item.name.substring(0, textLengthLimit - 3) + ' ...'
                    : item.name}
                </Text>
              </Pressable>
            );
          })}
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  input: {
    width: 200,
    height: 50,
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 17,
    backgroundColor: theme.stockCardBackground,
    color: theme.colorPrimary,
  },
});
