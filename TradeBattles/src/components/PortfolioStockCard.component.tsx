import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  Dimensions,
} from 'react-native';
import {theme} from '../shared/themes';
import {PortfolioStock} from '../shared/Types';
import {useNavigation} from '@react-navigation/native';
import type {ProfileScreenNavigationProp} from '../shared/Types';
import {showNotification} from '../shared/Notification';

export const PortfolioStockCard: React.FC<{
  stock: PortfolioStock;
  battleid: string;
  userid: string;
  currentUserPortfolio: PortfolioStock[];
  setCurrentUserPortfolio: React.Dispatch<
    React.SetStateAction<PortfolioStock[]>
  >;
}> = ({
  stock,
  battleid,
  userid,
  currentUserPortfolio,
  setCurrentUserPortfolio,
}) => {
  const navigation = useNavigation<ProfileScreenNavigationProp>();

  const width = Dimensions.get('window').width;

  return (
    <Pressable
      style={styles.container}
      onPress={() => {
        navigation.navigate('BuySellStock', {
          stock: stock.quote,
          shares_owned: stock.quantity,
          average_cost: stock.averageCost,
          battle_id: battleid,
          user_id: userid,
          currentUserPortfolio,
          setCurrentUserPortfolio,
        });

        showNotification(
          'Battle time is near..',
          'Your battle starts in 1 day',
        );
      }}>
      <View style={styles.logo_container}>
        <Image
          style={{
            width: '100%',
            height: 30,
            resizeMode: 'contain',
            borderRadius: 50,
          }}
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
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderBottomWidth: 0.3,
    borderBottomColor: theme.greyPrimary,
    backgroundColor: theme.stockCardBackground,
  },
  logo_container: {
    height: 30,
    width: 30,
    // resizeMode: 'cover',
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
