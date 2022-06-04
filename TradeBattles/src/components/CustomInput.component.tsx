import React, {SetStateAction} from 'react';
import {StyleSheet, View, TextInput, useWindowDimensions} from 'react-native';
import {theme} from '../shared/themes';

type CustomInputProps = {
  value: string;
  setValue: React.Dispatch<SetStateAction<any>>;
  placeholder: string;
  secureTextEntry?: boolean;
};

export const CustomInput: React.FC<CustomInputProps> = ({
  value,
  setValue,
  placeholder,
  secureTextEntry,
}) => {
  return (
    <View style={styles.container}>
      <TextInput
        value={value}
        onChangeText={setValue}
        placeholder={placeholder}
        style={styles.input}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.primary_grey,
    width: 250,
    height: 50,
    justifyContent: 'center',
    // alignItems: 'center',
    paddingHorizontal: 15,
    borderRadius: 7,
    marginVertical: 7,
  },
  input: {},
});
