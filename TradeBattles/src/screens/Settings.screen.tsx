import React from 'react';
import {View, Text, StyleSheet, Image, Pressable} from 'react-native';
import {useUserContext} from '../App.provider';
import {GoBack} from '../components/GoBack.component';
import {theme} from '../shared/themes';
import {UserInitializer} from '../shared/EmptyInitializers';

export const Settings = () => {
  const userContext = useUserContext();
  return (
    <View style={styles.container}>
      <View style={{marginRight: 'auto'}}>
        <GoBack />
      </View>
      <Text
        style={{
          fontSize: 40,
          fontWeight: '600',
          // marginRight: 'auto',
          paddingHorizontal: 20,
        }}>
        My Account
      </Text>
      <View
        style={{
          backgroundColor: theme.greyPrimary,
          padding: 20,
          borderRadius: 15,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 50,
          shadowColor: 'grey',
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowRadius: 1,
          shadowOpacity: 0.3,
        }}>
        <Image
          style={{width: 50, height: 50, borderRadius: 50, marginBottom: 20}}
          source={{uri: userContext.user.photo ? userContext.user.photo : ''}}
        />
        <Text style={{fontSize: 25, fontWeight: '300'}}>
          {userContext.user.name}
        </Text>
      </View>

      <Pressable
        onPress={() => {
          userContext.handleSetUser(UserInitializer);
        }}
        style={{
          backgroundColor: theme.colorPrimary,
          paddingVertical: 15,
          paddingHorizontal: 40,
          borderRadius: 10,
          marginTop: 'auto',
          marginBottom: 100,
        }}>
        <Text style={{color: theme.light_mode_white, fontWeight: '600'}}>
          Logout
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: theme.light_mode_white,
  },
});
