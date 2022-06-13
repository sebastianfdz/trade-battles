import React, {useEffect, useRef} from 'react';
import {View, Text, StyleSheet, Image, Pressable, Animated} from 'react-native';
import {useUserContext} from '../App.provider';
import {GoBack} from '../components/GoBack.component';
import {theme} from '../shared/themes';
import {UserInitializer} from '../shared/EmptyInitializers';
import Svg, {G, Circle} from 'react-native-svg';

const percentage = 60;
const radius = 40;
const strokeWidth = 10;
const duration = 500;
const color = 'red';
const delay = 20;
const textColor = theme.colorPrimary;
const max = 100;

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
export const Settings = () => {
  const userContext = useUserContext();
  const halfCircle = radius + strokeWidth;
  const circleCircumference = 2 * Math.PI * radius;
  const circleRef = useRef<any>();
  const animatedValue = useRef(new Animated.Value(0)).current;
  const animation = (toValue: number) => {
    return Animated.timing(animatedValue, {
      toValue,
      duration,
      delay,
      useNativeDriver: true,
    }).start(() => {
      animation(toValue === 0 ? percentage : 0);
    });
  };

  useEffect(() => {
    animation(percentage);

    animatedValue.addListener(v => {
      if (circleRef?.current) {
        const maxPercentage = (100 * v.value) / max;
        const strokeDashOffset =
          circleCircumference - (circleCircumference * maxPercentage) / 100;

        circleRef.current.setNativeProps({
          strokeDashOffset,
        });
      }
    });
  });
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
      {/* <View>
        <Svg
          width={radius * 2}
          height={radius * 2}
          viewBox={`0 0 ${halfCircle * 2} ${halfCircle * 2}`}>
          <G rotation={'-90'} origin={`${halfCircle}, ${halfCircle}`}>
            <Circle
              cy="50%"
              cx="50%"
              stroke={color}
              strokeWidth={strokeWidth}
              r={radius}
              fill={'transparent'}
              strokeOpacity={0.2}
            />
            <AnimatedCircle
              ref={circleRef}
              cy="50%"
              cx="50%"
              stroke={color}
              strokeWidth={strokeWidth}
              r={radius}
              fill={'transparent'}
              strokeDasharray={circleCircumference}
              strokeDashoffset={circleCircumference}
              strokeLinecap="round"
            />
          </G>
        </Svg>
      </View> */}
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
