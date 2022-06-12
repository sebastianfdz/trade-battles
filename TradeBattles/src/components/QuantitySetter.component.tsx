import React from 'react';
import {View, Pressable, Text, Dimensions, StyleSheet} from 'react-native';
import {theme} from '../shared/themes';
const width = Dimensions.get('window').width;

export const QuantitySetter: React.FC<{
  quantitySelected: number;
  setQuantitySelected: React.Dispatch<React.SetStateAction<number>>;
}> = ({quantitySelected, setQuantitySelected}) => {
  return (
    <View style={styles.quantity_setter_container}>
      <View style={styles.quantity_setter}>
        <Pressable
          onPress={() => {
            if (quantitySelected > 0) {
              setQuantitySelected(prevState => prevState - 1);
            }
          }}
          style={[styles.plus_minus_button, {borderRightWidth: 1}]}>
          <Text style={{fontSize: 25}}>-</Text>
        </Pressable>
        <Text style={styles.quantity_selected}>{quantitySelected}</Text>
        {/* TODO --> Make quantity editable by text aswell */}
        <Pressable
          onPress={() => {
            setQuantitySelected(prevState => {
              return prevState + 1;
            });
          }}
          style={[styles.plus_minus_button, {borderLeftWidth: 1}]}>
          <Text style={{fontSize: 25}}>+</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  plus_minus_button: {
    padding: 3,
    borderColor: theme.colorPrimary,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },

  quantity_setter_container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  quantity_setter: {
    flexDirection: 'row',
    borderColor: theme.colorPrimary,
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 20,
  },
  quantity_selected: {
    fontSize: 25,
    marginHorizontal: 20,
    width: 'auto',
    alignSelf: 'center',
    textAlign: 'center',
  },
});
