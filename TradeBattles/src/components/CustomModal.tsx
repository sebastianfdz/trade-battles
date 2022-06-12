import LottieView from 'lottie-react-native';
import React, {useEffect, useState} from 'react';
import {View, Modal, Text, Pressable, StyleSheet} from 'react-native';
import {theme} from '../shared/themes';
const correctTransactionSrc = require('../../assets/lotties/correct_transaction.json');
const incorrectTransactionSrc = require('../../assets/lotties/incorrect_transaction.json');
const confettiSrc = require('../../assets/lotties/confetti.json');

export const CustomModal: React.FC<{
  viewable: boolean;
  setViewable: React.Dispatch<React.SetStateAction<boolean>>;
  text: string;
}> = ({viewable = false, setViewable, text}) => {
  // const [isValid, setIsValid] = useState(false);

  // useEffect(() => {
  //   const invalidTransaction =
  //     text === 'Cannot sell more stocks than you own.' ||
  //     text === 'You must select at least one stock';

  //   if (invalidTransaction === false) {
  //     console.log(text);
  //     setIsValid(true);
  //   } else {
  //     setIsValid(false);
  //   }
  // }, []);

  // console.warn(text, viewable, invalidTransaction);
  // console.warn(text);
  // <LottieView source={incorrectTransactionSrc} autoPlay />
  // <LottieView source={correctTransactionSrc} autoPlay />
  // <LottieView source={confettiSrc} autoPlay />

  console.warn(text);
  const modalIsAPositiveResponse = text.includes('Success');
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={viewable}
        onRequestClose={() => {
          setViewable(false);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {modalIsAPositiveResponse ? (
              <LottieView source={correctTransactionSrc} autoPlay />
            ) : (
              // <LottieView source={confettiSrc} autoPlay  />
              <LottieView source={incorrectTransactionSrc} autoPlay />
            )}
            <Text style={styles.modalText}>{text}</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setViewable(false)}>
              <Text style={styles.textStyle}>Got it!</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginTop: '50%',
    height: 350,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  button: {
    padding: 15,
    borderRadius: 15,
  },
  buttonClose: {
    backgroundColor: theme.colorPrimary,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 15,
  },
});
