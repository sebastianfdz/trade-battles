import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  SafeAreaView,
  Animated,
} from 'react-native';
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
          paddingTop: 120,
          paddingBottom: 100,
          marginHorizontal: LATERAL_SPACE,
        }}
        decelerationRate={0}
        snapToInterval={CONTAINER_SIZE}
        scrollEventThrottle={16}
        data={dummy}
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
                  // padding: SPACE_BETWEEN_BATTLES,
                  // backgroundColor: 'white',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transform: [{translateY}],
                }}>
                <Text style={{marginBottom: 30}}>Battle Name</Text>
                <View
                  style={{
                    backgroundColor: theme.primary_green,
                    width: '100%',
                    height: '100%',
                    borderRadius: 34,
                  }}></View>
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
  },
  header: {
    fontSize: 30,
    fontWeight: '700',
  },
  battle: {
    width: '100%',
    height: CONTAINER_SIZE * 1.2,
    resizeMode: 'cover',
    borderRadius: 24,
    // margin: 0,
    // marginBottom: 10,
  },
});

{
  /* <Text style={{marginTop: 50, fontSize: 40, fontWeight: '700'}}>
        My Battles
      </Text>
      {myBattles.map(battle => (
        <ScrollView horizontal={true}>
          <View style={styles.header_container}>
            <Text style={styles.header}>{battle.battle_name}</Text>
            <Text>$ 8,341.33</Text>
          </View>
          <View style={styles.body_container}>
            {battle.battle_members.map(member => (
              <View>
                <Text>
                  {member.first_name} {member.last_name}
                </Text>
              </View>
            ))}
          </View>
        </ScrollView>
      ))}*/
}

// header: {
//   fontSize: 30,
//   fontWeight: '700',
// },
// header_container: {
//   backgroundColor: theme.primary_yellow,
//   borderTopLeftRadius: 50,
//   borderTopRightRadius: 50,
//   justifyContent: 'center',
//   alignItems: 'center',
//   alignSelf: 'center',
//   width: 275,
//   marginTop: 50,
//   height: 150,
// },
// body_container: {
//   backgroundColor: theme.greyPrimary,
//   borderBottomLeftRadius: 50,
//   borderBottomRightRadius: 50,
//   justifyContent: 'center',
//   alignItems: 'center',
//   alignSelf: 'center',
//   width: 275,
//   height: 300,
//   shadowColor: 'black',
//   shadowOffset: {
//     width: 0,
//     height: 10,
//   },
//   shadowRadius: 5,
//   shadowOpacity: 0.1,
// },

// props to https://www.youtube.com/watch?v=hD5Hi_XG4lc for the carrousell animation
