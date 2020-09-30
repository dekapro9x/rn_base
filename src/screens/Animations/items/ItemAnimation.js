import React, {useRef, useEffect} from 'react';
import {Text, Animated, TouchableOpacity} from 'react-native';
import hexToRgba from 'hex-to-rgba';

import {COLOR, SIZE} from '../../../utils';

export default function ItemAnimation(props) {
  const {item, index, pressShowModalAnimation} = props;
  const animatedValue = useRef(new Animated.Value(0.01)).current;
  const translate_Animation_Object = animatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [-SIZE.width(100), 0, SIZE.width(100)],
  });
  const opacity_Animation_Object = animatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 1, 0],
  });
  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: 0.5,
      duration: (index + 1) * 500,
      useNativeDriver: true,
    }).start(() => {});
    return () => {};
  }, []);

  return (
    <Animated.View
      style={[
        {
          width: SIZE.width(100),
          height: SIZE.height(7),
          backgroundColor:
            index % 2 == 0 ? hexToRgba(COLOR.red, '0.77') : COLOR.white,
        },
        {
          transform: [{translateX: translate_Animation_Object}],
          opacity: opacity_Animation_Object,
        },
      ]}>
      <TouchableOpacity onPress={pressShowModalAnimation} style={{flex: 1}}>
        <Text>{item.name}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}
