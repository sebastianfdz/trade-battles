import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  SafeAreaView,
  Animated,
} from 'react-native';
import {ApiClient} from '../services/ApiClient.service';
import {theme} from '../shared/themes';
import type {Battle} from '../shared/Types';
import {BattleCard} from '../components/BattleCard.component';
import {useUserContext} from '../App.provider';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const BATTLE_CONTAINER = width * 0.7;

export const MyBattles: React.FC = () => {
  const [myBattles, setMyBattles] = useState<Battle[]>([]);
  const scrollX = React.useRef(new Animated.Value(0)).current;

  const userContext = useUserContext();

  console.warn(userContext.user);
  useEffect(() => {
    ApiClient.getMyBattles(
      userContext.user.id ? userContext.user.id : '110660774589450165950',
    ).then(res => setMyBattles(res.data));
  }, []);

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
          marginHorizontal: (width - BATTLE_CONTAINER) / 2,
        }}
        decelerationRate={0}
        snapToInterval={BATTLE_CONTAINER}
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
              // key={item.battle_id}
              style={{width: BATTLE_CONTAINER, height: height * 0.5}}>
              <Animated.View
                style={{
                  marginHorizontal: 15,
                  alignItems: 'center',
                  justifyContent: 'center',
                  transform: [{translateY}],
                }}>
                <BattleCard
                  battle_id={item.battle_id}
                  battle_name={item.battle_name}
                  battle_members={item.battle_members}
                />
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
});

// props to https://www.youtube.com/watch?v=hD5Hi_XG4lc for the carrousell animation
