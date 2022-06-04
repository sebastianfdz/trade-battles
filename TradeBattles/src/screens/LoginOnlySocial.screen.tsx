import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  useWindowDimensions,
  ScrollView,
} from 'react-native';
import {CustomInput} from '../components/CustomInput.component';
import {CustomButton} from '../components/CustomButton.component';
import {theme} from '../shared/themes';
const googleImageSource = require('../../assets/images/Google_logo.png');
const facebookImageSource = require('../../assets/images/Facebook_logo.png');
const appleImageSource = require('../../assets/images/Apple_logo.png');

const logoSrc = require('../../assets/images/Placeholder_logo.png');

export const LoginOnlySocial: React.FC = () => {
  const {height} = useWindowDimensions();

  const onSignInWithGooglePressed = () => {
    console.warn('Google Sign In');
  };

  const onSignInWithFacebookPressed = () => {
    console.warn('Google Sign In');
  };

  const onSignInWithApplePressed = () => {
    console.warn('Google Sign In');
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Image
          source={logoSrc}
          style={[styles.logo, {height: height * 0.3}]}
          resizeMode="contain"
        />

        <CustomButton
          text="Sign In with Google"
          onPress={onSignInWithGooglePressed}
          type="PRIMARY"
          backgroundColor={theme.primary_grey}
          icon={googleImageSource}
        />
        <CustomButton
          text="Sign In with Facebook"
          onPress={onSignInWithFacebookPressed}
          type="PRIMARY"
          backgroundColor={theme.primary_grey}
          icon={facebookImageSource}
        />
        <CustomButton
          text="Sign In with Apple"
          onPress={onSignInWithApplePressed}
          type="PRIMARY"
          backgroundColor={theme.primary_grey}
          icon={appleImageSource}
        />
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {alignItems: 'center', padding: 20, marginTop: 60},
  logo: {
    width: '70%',
    maxWidth: 300,
    maxHeight: 200,
  },
});
