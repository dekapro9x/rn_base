import React from 'react';
import {View} from 'react-native';
import {COLOR, SIZE} from '../../../utils';

export default function AnimatedSpring() {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        width: SIZE.width(100),
        backgroundColor: COLOR.milk,
      }}></View>
  );
}
