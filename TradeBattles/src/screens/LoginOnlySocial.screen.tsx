import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  useWindowDimensions,
  ScrollView,
} from 'react-native';
import {CustomButton} from '../components/CustomButton.component';
import {theme} from '../shared/themes';
const googleImageSource = require('../../assets/images/Google_logo.png');
const facebookImageSource = require('../../assets/images/Facebook_logo.png');
const appleImageSource = require('../../assets/images/Apple_logo.png');
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {appleAuth} from '@invertase/react-native-apple-authentication';
import type {User} from '../shared/Types';

GoogleSignin.configure({
  scopes: ['https://www.googleapis.com/auth/drive.readonly'], // [Android] what API you want to access on behalf of the user, default is email and profile
  webClientId:
    '590254695836-9ai733i10c8phjeh71t0e5vp0hctm905.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
});

const logoSrc = require('../../assets/images/Placeholder_logo.png');

export const LoginOnlySocial: React.FC = () => {
  const [user, setUser] = useState('');
  const {height} = useWindowDimensions();

  const onSignInWithGooglePressed = async () => {
    try {
      const usergoogle = await GoogleSignin.signIn();

      // if (usergoogle) {
      //   setUser(JSON.stringify(usergoogle));
      // }
      const googleCredential = auth.GoogleAuthProvider.credential(
        usergoogle.idToken,
      );
      console.warn(usergoogle, 'user');
      return auth().signInWithCredential(googleCredential);
    } catch (error) {
      console.warn(error);
    }
  };

  const onSignInWithFacebookPressed = () => {
    console.warn('Facebook Sign In');
  };

  const onSignInWithApplePressed = async () => {
    try {
      console.warn(appleAuth.isSupported);

      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });

      // get current authentication state for user
      // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
      const credentialState = await appleAuth.getCredentialStateForUser(
        appleAuthRequestResponse.user,
      );

      // use credentialState response to ensure the user is authenticated
      if (credentialState === appleAuth.State.AUTHORIZED) {
        // user is authenticated
      }
    } catch (error) {
      console.warn(error);
    }
    console.warn('Apple Sign In');
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
          backgroundColor={theme.greyPrimary}
          icon={googleImageSource}
        />
        <CustomButton
          text="Sign In with Facebook"
          onPress={onSignInWithFacebookPressed}
          type="PRIMARY"
          backgroundColor={theme.greyPrimary}
          icon={facebookImageSource}
        />
        <CustomButton
          text="Sign In with Apple"
          onPress={onSignInWithApplePressed}
          type="PRIMARY"
          backgroundColor={theme.greyPrimary}
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
