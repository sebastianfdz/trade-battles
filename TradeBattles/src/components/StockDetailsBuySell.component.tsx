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
import {formatter} from '../shared/Methods';
import {theme} from '../shared/themes';
import {BuySellProps} from '../shared/Types';
import {CustomModal} from './CustomModal';
import {QuantitySetter} from './QuantitySetter.component';
const closeIconSrc = require('../../assets/icons/close_icon_black.png');

const width = Dimensions.get('window').width;
export const StockDetailsBuySell: React.FC<BuySellProps> = props => {
  const {
    price,
    quantitySelected,
    quantityAvailable,
    setQuantitySelected,
    setQuantityAvailable,
    setBuySellViewable,
    setCurrentUserPortfolio,
    currentUserPortfolio,
    buySellViewable,
    stock,
    battle_id,
    user_id,
  } = props;
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

  const handleBuyOrder = () => {
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
        setQuantitySelected(0),
        setCurrentUserPortfolio(prevState => [
          ...prevState,
          {
            price: price > 0 ? price : stock.latestPrice,
            symbol: stock.symbol,
            change: 0,
            quantity: quantitySelected,
            averageCost: price > 0 ? price : stock.latestPrice,
            quote: stock,
          },
        ]))
      : setCantBuySellZeroModal(true);
  };

  const handleSellOrder = () => {
    quantitySelected > quantityAvailable
      ? setCantSellModal(true)
      : quantitySelected <= 0
      ? setCantBuySellZeroModal(true)
      : (ApiClient.postTransaction({
          ...buySellApiBody,
          action: 'SELL',
        }),
        setPurchaseOrder({
          ...purchaseOrderBody,
          action: 'SELL',
        }),
        setSuccesfulPurchaseModal(true),
        setQuantityAvailable(prevstate => prevstate - quantitySelected),
        setQuantitySelected(0));
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
        <View style={styles.buy_sell_modal_container}>
          <Pressable onPress={() => setBuySellViewable(false)}>
            <Image style={styles.close_icon} source={closeIconSrc} />
          </Pressable>
          <View style={{alignItems: 'center'}}>
            <View style={styles.total_amount}>
              {/* <Text style={{fontSize: 17}}>TOTAL: </Text> */}
              <Text style={{alignSelf: 'center', fontSize: 30}}>
                {formatter.format(
                  (price > 0 ? price : stock.latestPrice) * quantitySelected,
                )}
              </Text>
            </View>
            <QuantitySetter
              quantitySelected={quantitySelected}
              setQuantitySelected={setQuantitySelected}
            />
          </View>
          <Text style={{alignSelf: 'center'}}>
            {quantityAvailable} available to sell
          </Text>
          <View style={styles.buysell_button_container}>
            <Pressable
              onPress={handleSellOrder}
              style={[styles.button, {backgroundColor: theme.primary_yellow}]}>
              <Text style={styles.button_text}>Sell</Text>
            </Pressable>
            <Pressable
              style={[styles.button, {backgroundColor: theme.colorPrimary}]}
              onPress={handleBuyOrder}>
              <Text
                style={[styles.button_text, {color: theme.light_mode_white}]}>
                Buy
              </Text>
            </Pressable>
          </View>
        </View>

        {/* ------------  Hidden Custom Modals ---------------*/}

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
            text={`Success! ${purchaseOrder.quantity} ${
              purchaseOrder.ticker
            } stock${purchaseOrder.quantity > 1 ? 's' : ''} ${
              purchaseOrder.action === 'BUY' ? 'added to' : 'sold from'
            } your portfolio at a price of ${formatter.format(
              purchaseOrder.price,
            )}`}
            viewable={succesfulPurchaseModal}
            setViewable={setSuccesfulPurchaseModal}
          />
        )}
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
  total_amount: {flexDirection: 'row', alignItems: 'center'},

  buysell_button_container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 30,
  },
});
