import React from 'react';
import {useState} from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Modal,
  Image,
  Dimensions,
} from 'react-native';
import {ApiClient} from '../services/ApiClient.service';
import {PurchaseOrderInitializer} from '../shared/EmptyInitializers';
import {theme} from '../shared/themes';
import {Stock} from '../shared/Types';
import {CustomModal} from './CustomModal';
const closeIconSrc = require('../../assets/icons/close_icon_black.png');

const width = Dimensions.get('window').width;
export const StockDetailsBuySell: React.FC<{
  price: number;
  quantitySelected: number;
  quantityAvailable: number;
  setQuantitySelected: React.Dispatch<React.SetStateAction<number>>;
  setQuantityAvailable: React.Dispatch<React.SetStateAction<number>>;
  setBuySellViewable: React.Dispatch<React.SetStateAction<boolean>>;
  buySellViewable: boolean;
  stock: Stock;
  battle_id: string;
  user_id: string;
}> = ({
  price,
  quantitySelected,
  quantityAvailable,
  setQuantitySelected,
  setQuantityAvailable,
  setBuySellViewable,
  buySellViewable,
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
      <Modal
        animationType="slide"
        transparent={true}
        visible={buySellViewable}
        onRequestClose={() => {
          setBuySellViewable(!buySellViewable);
        }}>
        {cantSellModal && (
          <CustomModal
            text="Cannot sell more stocks than you own."
            viewable={cantSellModal}
            setViewable={setCantSellModal}
          />
        )}
        {cantBuySellZeroModal && (
          <CustomModal
            text="You must select at least one stock"
            viewable={cantBuySellZeroModal}
            setViewable={setCantBuySellZeroModal}
          />
        )}
        {succesfulPurchaseModal && (
          <CustomModal
            text={`${purchaseOrder.quantity} ${purchaseOrder.ticker} stock${
              purchaseOrder.quantity > 1 ? 's' : ''
            } ${
              purchaseOrder.action === 'BUY' ? 'added to' : 'sold from'
            } your portfolio at a price of $${purchaseOrder.price}`}
            viewable={succesfulPurchaseModal}
            setViewable={setSuccesfulPurchaseModal}
          />
        )}
        <View style={styles.buy_sell_modal_container}>
          <Pressable onPress={() => setBuySellViewable(false)}>
            <Image style={styles.close_icon} source={closeIconSrc} />
          </Pressable>
          <View style={{alignItems: 'center'}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{fontSize: 17}}>TOTAL: </Text>
              <Text style={{alignSelf: 'center', fontSize: 30}}>
                $
                {(
                  (price > 0 ? price : stock.latestPrice) * quantitySelected
                ).toFixed(2)}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: 10,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  borderColor: theme.colorPrimary,
                  borderWidth: 1,
                  borderRadius: 5,
                  marginVertical: 20,
                }}>
                <Pressable
                  onPress={() => {
                    if (quantitySelected > 0) {
                      setQuantitySelected(prevState => prevState - 1);
                    }
                  }}
                  style={[styles.qty, {borderRightWidth: 1}]}>
                  <Text style={{fontSize: 25}}>-</Text>
                </Pressable>
                <Text
                  style={{
                    fontSize: 25,
                    marginHorizontal: 20,
                    width: 'auto',
                    alignSelf: 'center',
                    textAlign: 'center',
                  }}>
                  {quantitySelected}
                </Text>
                <Pressable
                  onPress={() => {
                    setQuantitySelected(prevState => prevState + 1);
                  }}
                  style={[styles.qty, {borderLeftWidth: 1}]}>
                  <Text style={{fontSize: 25}}>+</Text>
                </Pressable>
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
                  setQuantityAvailable(
                    prevstate => prevstate - quantitySelected,
                  ),
                  setQuantitySelected(0);
              }}
              style={[styles.button, {backgroundColor: theme.primary_yellow}]}>
              <Text style={styles.button_text}>Sell</Text>
            </Pressable>
            <Pressable
              style={[styles.button, {backgroundColor: 'black'}]}
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
                    setQuantityAvailable(
                      prevstate => prevstate + quantitySelected,
                    ),
                    setQuantitySelected(0))
                  : setCantBuySellZeroModal(true)
              }>
              <Text style={[styles.button_text, {color: 'white'}]}>Buy</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    width: width * 0.33,
    borderRadius: 10,
    marginHorizontal: 15,
  },
  button_text: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '600',
  },
  qty: {
    padding: 3,
    borderColor: theme.colorPrimary,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  buy_sell_modal_container: {
    flexDirection: 'column',
    marginTop: 250,
    backgroundColor: 'white',
    alignSelf: 'center',
    borderRadius: 20,
    height: 300,
    width: '90%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  close_icon: {
    marginLeft: 'auto',
    width: 20,
    height: 20,
    marginRight: 20,
    marginTop: 20,
  },
});
