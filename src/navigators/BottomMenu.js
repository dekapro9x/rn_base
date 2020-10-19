//Library:
import React from 'react';
import * as Animatable from 'react-native-animatable';
import {useNavigation} from '@react-navigation/core';
import LinearGradient from 'react-native-linear-gradient';

//Setup:
import {DataBottomMenu} from '../screens/Home/data/DataBottomMenu';
import {COLOR, SIZE} from '../utils';

//Component:
import {AppImageWithTextButton} from '../elements/AppImageWithTextButton';

export default function BottomMenu() {
  const navigation = useNavigation();
  if (DataBottomMenu.length == 0) {
    return null;
  }
  const pressMenu = (item) => () => {
    navigation.navigate(item.screen);
  };
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
    <LinearGradient
      locations={[1.0, 0.0]}
      start={{x: 1.0, y: 0.0}}
      end={{x: 0.0, y: 1.0}}
      colors={['crimson', 'lightsalmon']}>
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
          paddingVertical: 10,
        }}>
        {renderItem()}
      </Animatable.View>
    </LinearGradient>
  );
}
