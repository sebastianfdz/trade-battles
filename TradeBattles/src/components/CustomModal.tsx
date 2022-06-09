import React from 'react';
import {View, Modal, Text, Pressable, StyleSheet} from 'react-native';
import {theme} from '../shared/themes';

export const CustomModal: React.FC<{
  viewable: boolean;
  setViewable: React.Dispatch<React.SetStateAction<boolean>>;
  text: string;
}> = ({viewable, setViewable, text}) => {
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={viewable}
        onRequestClose={() => {
          setViewable(!viewable);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{text}</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setViewable(!viewable)}>
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
    padding: 20,
    borderRadius: 15,
  },
  buttonClose: {
    backgroundColor: theme.primary_green,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 20,
  },
});
