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
import {useNavigation} from '@react-navigation/native';
import {ProfileScreenNavigationProp} from '../shared/Types';
import LottieView from 'lottie-react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const BATTLE_CONTAINER = width;
const pointingArrowSrc = require('../../assets/lotties/pointing_arrow.json');

export const MyBattles: React.FC = () => {
  const [myBattles, setMyBattles] = useState<Battle[]>([]);
  const [noBattles, setNoBattles] = useState(false);

  const userContext = useUserContext();

  useEffect(() => {
    ApiClient.getMyBattles(
      userContext.user.id ? userContext.user.id : '110660774589450165950',
    )
      .then(res => setMyBattles(res.data))
      .catch(error => setNoBattles(true));
  }, []);

  const scrollX = React.useRef(new Animated.Value(0)).current;

  const [currentBattleIndex, setCurrentBattleIndex] = useState(0);
  const scrollListener = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const totalWidth = event.nativeEvent.layoutMeasurement.width;
    const xPosition = event.nativeEvent.contentOffset.x;
    setCurrentBattleIndex(Math.floor(xPosition / totalWidth));
  };

  const navigation = useNavigation<ProfileScreenNavigationProp>();

  return (
    <SafeAreaView style={styles.container}>
      <Pressable
        style={styles.create_battle_button}
        onPress={() => navigation.navigate('CreateBattle')}>
        <Text
          style={{
            fontSize: 30,
            color: theme.light_mode_white,
            fontWeight: '700',
            alignSelf: 'center',
          }}>
          +
        </Text>
      </Pressable>
      {noBattles && (
        <View
          style={{
            transform: [{rotate: '180deg'}],
            paddingHorizontal: 60,
            marginLeft: 'auto',
            width: 70,
            height: 70,
          }}>
          <LottieView source={pointingArrowSrc} autoPlay />
        </View>
      )}
      <Text style={styles.header}>My Battles</Text>

      {noBattles ? (
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <Text
            style={{
              color: theme.colorPrimary,
              fontSize: 30,
              fontWeight: '300',
              textAlign: 'center',
              marginTop: '40%',
              paddingHorizontal: 30,
            }}>
            You currently have no battles, create one with the top right button!
          </Text>
        </View>
      ) : (
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
      )}
      <View style={{marginTop: -100, marginBottom: 35, flexDirection: 'row'}}>
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
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.light_mode_white,
    // marginTop: -30,
  },
  header: {
    fontSize: 30,
    fontWeight: '700',
    marginTop: 20,
    marginBottom: -25,
  },
  create_battle_button: {
    width: 40,
    height: 40,
    marginLeft: 'auto',
    marginRight: 40,
    marginTop: 20,
    backgroundColor: theme.colorPrimary,
    borderRadius: 50,
    justifyContent: 'center',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 3,
    shadowOpacity: 0.2,
  },
});

// props to https://www.youtube.com/watch?v=hD5Hi_XG4lc for the carrousell animation
