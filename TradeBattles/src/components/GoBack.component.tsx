import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Pressable, Image, Dimensions} from 'react-native';
const backIconSrc = require('../../assets/icons/go_back_icon_black.png');

export const GoBack: React.FC = () => {
  const navigation = useNavigation();

  const height = Dimensions.get('window').height;
  const width = Dimensions.get('window').width;
  return (
    <Pressable
      onPress={() => navigation.goBack()}
      style={{padding: width * 0.05, marginTop: height * 0.06}}>
      <Image style={{height: 30, width: 30}} source={backIconSrc} />
    </Pressable>
  );
};
