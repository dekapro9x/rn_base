import React, {useEffect, useRef} from 'react';
import {Text, View, Animated} from 'react-native';
import {SIZE} from '../../../utils';

export default function AnimationDecay() {
  const animatedValue = useRef(new Animated.Value(0));
  const backgroundColor = animatedValue.current.interpolate({
    inputRange: [0, 10000],
    outputRange: ['rgba(255,255,255,1)', 'rgba(0,0,0,1)'],
  });
  useEffect(() => {
    animatedValue.current.setValue(500);
    return () => {};
  }, []);
  return (
    <Animated.View
      style={{
        left: animatedValue.current,
        backgroundColor: backgroundColor,
        width: SIZE.width(90),
        height: SIZE.height(60),
        alignSelf: 'center',
        justifyContent: 'center',
      }}>
      <Text> SetValue </Text>
    </Animated.View>
  );
}
