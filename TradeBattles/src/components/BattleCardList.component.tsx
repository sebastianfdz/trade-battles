import React, {useState, useEffect} from 'react';
import {
  Animated,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
  View,
} from 'react-native';
import {useUserContext} from '../App.provider';
import {ApiClient} from '../services/ApiClient.service';
import {Battle} from '../shared/Types';
import {BattleCard} from './BattleCard.component';
import {theme} from '../shared/themes';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const BATTLE_CONTAINER = width;
export const BattleCardList: React.FC<{
  myBattles: Battle[];
  setMyBattles: React.Dispatch<React.SetStateAction<Battle[]>>;
  setNoBattles: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({myBattles, setMyBattles, setNoBattles}) => {
  const userContext = useUserContext();

  const [currentBattleIndex, setCurrentBattleIndex] = useState(0);

  useEffect(() => {
    ApiClient.getMyBattles(userContext.user.id)
      .then(res => setMyBattles(res.data))
      .catch(error => setNoBattles(true));
  }, []);

  const scrollX = React.useRef(new Animated.Value(0)).current;

  const scrollListener = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const totalWidth = event.nativeEvent.layoutMeasurement.width;
    const xPosition = event.nativeEvent.contentOffset.x;
    setCurrentBattleIndex(Math.floor(xPosition / totalWidth));
  };

  return (
    <>
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
              style={{
                width: BATTLE_CONTAINER,
                height: height * 0.5,
              }}>
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
      <View
        style={{
          flexDirection: 'row',
        }}>
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
    </>
  );
};
