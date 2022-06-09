import React from 'react';
import {useState} from 'react';
import {View, Text, Pressable, StyleSheet, Modal} from 'react-native';
import {ApiClient} from '../services/ApiClient.service';
import {PurchaseOrderInitializer} from '../shared/EmptyInitializers';
import {theme} from '../shared/themes';
import {Stock} from '../shared/Types';
import {CustomModal} from './CustomModal';

export const StockDetailsBuySell: React.FC<{
  price: number;
  quantitySelected: number;
  quantityAvailable: number;
  setQuantitySelected: React.Dispatch<React.SetStateAction<number>>;
  setQuantityAvailable: React.Dispatch<React.SetStateAction<number>>;
  stock: Stock;
  battle_id: string;
  user_id: string;
}> = ({
  price,
  quantitySelected,
  quantityAvailable,
  setQuantitySelected,
  setQuantityAvailable,
  stock,
  battle_id,
  user_id,
}) => {
  const [cantSellModal, setCantSellModal] = useState(false);
  const [cantBuySellZeroModal, setCantBuySellZeroModal] = useState(false);
  const [succesfulPurchaseModal, setSuccesfulPurchaseModal] = useState(false);
  const [purchaseOrder, setPurchaseOrder] = useState(PurchaseOrderInitializer);

  const buySellApiBody = {
    battle_id,
    user_id,
    symbol: stock.symbol,
    price: price > 0 ? price : stock.latestPrice,
    quantity: quantitySelected,
    action: 'to be defined',
  };

  const purchaseOrderBody = {
    quantity: quantitySelected,
    ticker: stock.companyName,
    price: price > 0 ? price : stock.latestPrice,
    action: 'to be defined',
  };
  return (
    <View>
      <CustomModal
        text="Cannot sell more stocks than you own."
        viewable={cantSellModal}
        setViewable={setCantSellModal}
      />
      <CustomModal
        text="You must select at least one stock"
        viewable={cantBuySellZeroModal}
        setViewable={setCantBuySellZeroModal}
      />
      <CustomModal
        text={`${purchaseOrder.quantity} ${purchaseOrder.ticker} stock${
          purchaseOrder.quantity > 1 ? 's' : ''
        } ${
          purchaseOrder.action === 'BUY' ? 'added to' : 'sold from'
        } your portfolio at a price of $${purchaseOrder.price}`}
        viewable={succesfulPurchaseModal}
        setViewable={setSuccesfulPurchaseModal}
      />
      <View
        style={{
          flexDirection: 'row',
          paddingHorizontal: 100,
          justifyContent: 'space-between',
          marginTop: 50,
        }}>
        <View>
          <Text style={{marginBottom: 3}}>TOTAL</Text>
          <Text style={{alignSelf: 'center', fontSize: 30}}>
            $
            {(price > 0 ? price : stock.latestPrice * quantitySelected).toFixed(
              2,
            )}
          </Text>
        </View>
        <View>
          <Text style={{marginLeft: 'auto', marginBottom: 3}}>QTY</Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginLeft: 10,
            }}>
            <Text style={{fontSize: 18, marginRight: 5}}>
              {quantitySelected}
            </Text>
            <View>
              <Pressable
                onPress={() => {
                  setQuantitySelected(prevState => prevState + 1);
                }}
                style={styles.qty}>
                <Text>+</Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  if (quantitySelected > 0) {
                    setQuantitySelected(prevState => prevState - 1);
                  }
                }}
                style={styles.qty}>
                <Text>-</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
      <Text style={{alignSelf: 'center'}}>
        {quantityAvailable} available to sell
      </Text>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          padding: 30,
        }}>
        <Pressable
          onPress={() => {
            quantitySelected > quantityAvailable
              ? setCantSellModal(true)
              : quantitySelected <= 0
              ? setCantBuySellZeroModal(true)
              : ApiClient.postTransaction({
                  ...buySellApiBody,
                  action: 'SELL',
                }),
              setPurchaseOrder({
                ...purchaseOrderBody,
                action: 'SELL',
              }),
              setSuccesfulPurchaseModal(true),
              setQuantityAvailable(prevstate => prevstate - quantitySelected),
              setQuantitySelected(0);
          }}
          style={[styles.button, {backgroundColor: theme.primary_yellow}]}>
          <Text style={styles.button_text}>Sell</Text>
        </Pressable>
        <Pressable
          style={[styles.button, {backgroundColor: theme.primary_green}]}
          onPress={() =>
            quantitySelected > 0
              ? (ApiClient.postTransaction({
                  ...buySellApiBody,
                  action: 'BUY',
                }),
                setPurchaseOrder({
                  ...purchaseOrderBody,
                  action: 'BUY',
                }),
                setSuccesfulPurchaseModal(true),
                setQuantityAvailable(prevstate => prevstate + quantitySelected),
                setQuantitySelected(0))
              : setCantBuySellZeroModal(true)
          }>
          <Text style={[styles.button_text, {color: 'white'}]}>Buy</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    width: 150,
    borderRadius: 10,
  },
  button_text: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: '600',
  },
  qty: {
    padding: 3,
    backgroundColor: 'grey',
    borderRadius: 15,
  },
});
