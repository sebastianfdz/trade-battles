import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Pressable, Image} from 'react-native';
const backIconSrc = require('../../assets/icons/go_back_icon_black.png');

export const GoBack: React.FC = () => {
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() => navigation.goBack()}
      style={{padding: 15, marginTop: 60}}>
      <Image style={{height: 30, width: 30}} source={backIconSrc} />
    </Pressable>
  );
};
