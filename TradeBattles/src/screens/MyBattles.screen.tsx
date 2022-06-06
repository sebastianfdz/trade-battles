import React, {useState, useEffect, useContext} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  SafeAreaView,
  Animated,
  Pressable,
} from 'react-native';
import {useUserContext} from '../App.provider';
import {ApiClient} from '../services/ApiClient.service';
import {theme} from '../shared/themes';
import type {Battle, BattleMember, Transaction} from '../shared/Types';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const CONTAINER_SIZE = width * 0.7;
const LATERAL_SPACE = (width - CONTAINER_SIZE) / 2;
const SPACE_BETWEEN_BATTLES = 15;

export const MyBattles: React.FC = () => {
  const [myBattles, setMyBattles] = useState<Battle[]>([]);
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const userContext = useUserContext();
  useEffect(() => {
    ApiClient.getMyBattles('c3e56754-7abb-43d8-811d-52186035e1be').then(res =>
      setMyBattles(res.data),
    );
  }, []);

  const dummy = [1, 2, 3, 4, 5, 6];

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>My Battles</Text>
      <Animated.FlatList
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: true},
        )}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: 100,
          paddingBottom: 100,
          marginHorizontal: LATERAL_SPACE,
        }}
        decelerationRate={0}
        snapToInterval={CONTAINER_SIZE}
        scrollEventThrottle={16}
        data={myBattles}
        renderItem={({item, index}) => {
          const inputRange = [
            (index - 1) * CONTAINER_SIZE,
            index * CONTAINER_SIZE,
            (index + 1) * CONTAINER_SIZE,
          ];

          const outputRange = [0, -30, 0];

          const translateY = scrollX.interpolate({
            inputRange,
            outputRange,
          });
          return (
            <View style={{width: CONTAINER_SIZE, height: height * 0.5}}>
              <Animated.View
                style={{
                  marginHorizontal: SPACE_BETWEEN_BATTLES,
                  alignItems: 'center',
                  justifyContent: 'center',
                  transform: [{translateY}],
                }}>
                <View
                  style={{
                    backgroundColor: theme.greyPrimary,
                    width: '100%',
                    height: '100%',
                    borderRadius: 34,
                    shadowColor: 'black',
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowRadius: 3,
                    shadowOpacity: 0.2,
                  }}>
                  <View
                    style={{
                      backgroundColor: theme.primary_yellow,
                      height: 150,
                      borderTopStartRadius: 34,
                      borderTopEndRadius: 34,
                    }}>
                    <Text style={styles.header_small}>Battle Name</Text>
                    <View
                      style={{
                        borderBottomWidth: 0.3,
                        borderBottomColor: theme.colorPrimary,
                        width: '60%',
                        paddingBottom: 3,
                        marginBottom: 3,
                        alignSelf: 'center',
                      }}>
                      <Text
                        style={{
                          alignSelf: 'center',
                          marginTop: 15,
                          fontSize: 12,
                        }}>
                        Value of Portfolio
                      </Text>
                    </View>
                    <Text
                      style={{
                        alignSelf: 'center',
                        fontSize: 25,
                      }}>
                      $128,462.10
                    </Text>
                  </View>
                  <Pressable
                    onPress={() => console.warn(userContext.user.name)}
                    style={{
                      width: '100%',
                      height: 50,
                      backgroundColor: theme.primary_green,
                    }}>
                    <Text>Let me see thatuser</Text>
                  </Pressable>
                </View>
              </Animated.View>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.light_mode_white,
  },
  header: {
    fontSize: 30,
    fontWeight: '700',
    marginTop: 50,
  },
  header_small: {
    fontSize: 25,
    fontWeight: '700',
    marginTop: 30,
    alignSelf: 'center',
  },
  battle: {
    width: '100%',
    height: CONTAINER_SIZE * 1.2,
    resizeMode: 'cover',
    borderRadius: 24,
  },
});

// props to https://www.youtube.com/watch?v=hD5Hi_XG4lc for the carrousell animation
