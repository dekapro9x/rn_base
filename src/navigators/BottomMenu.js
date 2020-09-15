//Library:
import React, {useEffect, useState} from 'react';
import * as Animatable from 'react-native-animatable';

//Setup:
import {DataBottomMenu} from '../screens/Home/data/DataBottomMenu';
import {COLOR, SIZE} from '../utils';

//Component:
import {AppImageWithTextButton} from '../elements/AppImageWithTextButton';

export default function BottomMenu() {
  if (DataBottomMenu.length == 0) {
    return null;
  }
  const pressMenu = () => {};
  //Item:
  const renderItem = () => {
    return DataBottomMenu.map((item) => {
      return (
        <AppImageWithTextButton
          onPress={pressMenu(item)}
          textStyle={{color: COLOR.white, fontSize: SIZE.H6}}
          styleImage={{width: SIZE.width(8), height: SIZE.width(8)}}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
          resizeMode="contain"
          key={item.id}
          title={item.name}
          source={{uri: item.iconUrl}}
        />
      );
    });
  };
  return (
    <Animatable.View
      useNativeDriver={true}
      animation={'fadeInUp'}
      delay={450}
      duration={600}
      style={{
        flexDirection: 'row',
        width: SIZE.device_width,
        justifyContent: 'space-around',
        alignItems: 'flex-end',
        backgroundColor: COLOR.red,
        paddingVertical: 10,
      }}>
      {renderItem()}
    </Animatable.View>
  );
}
