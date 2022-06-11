import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  SafeAreaView,
  Animated,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Pressable,
} from 'react-native';
import {ApiClient} from '../services/ApiClient.service';
import {theme} from '../shared/themes';
import type {Battle} from '../shared/Types';
import {BattleCard} from '../components/BattleCard.component';
import {useUserContext} from '../App.provider';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const BATTLE_CONTAINER = width;

export const MyBattles: React.FC = () => {
  const [myBattles, setMyBattles] = useState<Battle[]>([]);

  const userContext = useUserContext();

  useEffect(() => {
    ApiClient.getMyBattles(
      userContext.user.id ? userContext.user.id : '110660774589450165950',
    ).then(res => setMyBattles(res.data));
  }, []);

  const scrollX = React.useRef(new Animated.Value(0)).current;

  const [currentBattleIndex, setCurrentBattleIndex] = useState(0);

  const scrollListener = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const totalWidth = event.nativeEvent.layoutMeasurement.width;
    const xPosition = event.nativeEvent.contentOffset.x;
    setCurrentBattleIndex(Math.floor(xPosition / totalWidth));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>My Battles</Text>
      <Animated.FlatList
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {
            useNativeDriver: true,
          },
        )}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: 100,
          paddingBottom: 100,
          marginHorizontal: (width - BATTLE_CONTAINER) / 2,
        }}
        decelerationRate={0}
        snapToInterval={BATTLE_CONTAINER}
        onMomentumScrollEnd={scrollListener}
        scrollEventThrottle={16}
        data={myBattles}
        renderItem={({item, index}) => {
          const inputRange = [
            (index - 1) * BATTLE_CONTAINER,
            index * BATTLE_CONTAINER,
            (index + 1) * BATTLE_CONTAINER,
          ];

          const outputRange = [0, -30, 0];
          const translateY = scrollX.interpolate({
            inputRange,
            outputRange,
          });
          return (
            <View
              key={item.battle_id}
              style={{width: BATTLE_CONTAINER, height: height * 0.5}}>
              <Animated.View
                style={{
                  marginHorizontal: 15,
                  alignItems: 'center',
                  justifyContent: 'center',
                  transform: [{translateY}],
                }}>
                <BattleCard
                  key={item.battle_id + item.battle_members}
                  battle={item}
                />
              </Animated.View>
            </View>
          );
        }}
      />
      <View style={{marginTop: -100, marginBottom: 15, flexDirection: 'row'}}>
        {myBattles.map((dot, index) => {
          const backgroundColor =
            index === currentBattleIndex ? theme.colorPrimary : 'grey';
          const size = index === currentBattleIndex ? 8 : 7;
          return (
            <View
              style={{
                backgroundColor: backgroundColor,
                height: size,
                width: size,
                marginHorizontal: 5,
                borderRadius: 50,
              }}></View>
          );
        })}
      </View>
      <Pressable
        style={{
          width: 50,
          height: 50,
          backgroundColor: theme.greyPrimary,
          borderRadius: 50,
          justifyContent: 'center',
          alignItems: 'center',
          shadowColor: 'black',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowRadius: 3,
          shadowOpacity: 0.2,
        }}>
        <Text
          style={{
            fontSize: 50,
            color: theme.colorPrimary,
          }}>
          +
        </Text>
      </Pressable>
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
});

// props to https://www.youtube.com/watch?v=hD5Hi_XG4lc for the carrousell animation
