import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {SIZE} from '../../../utils';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function HeaderHome() {
  return (
    <View
      style={{
        height: SIZE.width(12),
        width: SIZE.width(100),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
      <TouchableOpacity
        onPress={() => {}}
        style={{
          width: SIZE.width(30),
          justifyContent: 'center',
        }}>
        <FontAwesome
          style={{marginLeft: SIZE.width(2)}}
          name={'user-circle-o'}
          size={32}
          color={'black'}></FontAwesome>
      </TouchableOpacity>
      <Ionicons
        style={{marginRight: SIZE.width(2)}}
        name={'notifications'}
        size={32}
        color={'black'}></Ionicons>
    </View>
  );
}
