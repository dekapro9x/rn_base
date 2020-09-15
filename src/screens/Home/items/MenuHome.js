//Library:
import React, {useRef, useLayoutEffect, useState} from 'react';
import {View, Animated, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/core';

//Setup:
import {SIZE, COLOR, KEY_NAVIGATION} from '../../../utils';
import {AppText, AppImage, Loading} from '../../../elements';
//Component:

export default function MenuHome(props) {
  const {dataMenuHome} = props;
  const navigation = useNavigation();
  const [loading, setStateLoading] = useState(true);
  const itemAnimation = useRef(new Animated.Value(0.01)).current;
  const scale = itemAnimation.interpolate({
    inputRange: [0.01, 0.6, 1],
    outputRange: [0.01, 0.6, 1],
  });
  const opacity = itemAnimation.interpolate({
    inputRange: [0.01, 0.6, 1],
    outputRange: [0.01, 0.3, 1],
  });
  const translateY = itemAnimation.interpolate({
    inputRange: [0.01, 0.6, 1],
    outputRange: [-20, -10, 0],
  });

  //Thực hiện Animation:
  const activeAnimation = () => {
    Animated.timing(itemAnimation, {
      toValue: 1,
      duration: 600,
      delay: 100,
      useNativeDriver: true,
    }).start();
  };
  useLayoutEffect(() => {
    const timer = setTimeout(() => {
      setStateLoading(false);
      activeAnimation();
    }, 800);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  //Then số lượng dòng menu:
  const renderRow = () => {
    const row = dataMenuHome.map((listItemMenu, index) => {
      return (
        <View
          key={`${index}`}
          style={{
            width: SIZE.width(100),
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 2,
          }}>
          {renderListItemMenu(listItemMenu, index)}
        </View>
      );
    });
    return row;
  };

  //Lấy chiều cao của item:
  const getHeight = (numberItem) => {
    if (numberItem === 1) {
      return SIZE.width(96);
    }
    return SIZE.width(96) / numberItem;
  };

  //Ấn vào menu:
  const pressItem = (item) => () => {
    if (item.screen == KEY_NAVIGATION.webview) {
      navigation.navigate(KEY_NAVIGATION.webview, {data: {url: item.link}});
    } else {
      navigation.navigate(item.screen);
    }
  };
  //Hiển thị Item Menu:
  const renderItemMenu = (item, sizeItem, numberItem) => {
    const sizeImg = sizeItem / 1.4;
    if (item.type == 'icon') {
      return (
        <Animated.View
          key={`${item.id}`}
          style={[
            {
              opacity,
              transform: [{scale}, {translateY}, {perspective: 1000}],
            },
          ]}>
          <View
            style={{
              width: sizeItem,
              height: sizeItem,
              marginTop: SIZE.width(1),
              backgroundColor: '#F9F0F0',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: SIZE.width(3),
              margin: 5,
            }}>
            <AppImage
              source={{
                uri: item.img,
              }}
              style={{
                height: sizeImg,
                width: sizeImg,
              }}></AppImage>
            <AppText style={{fontSize: SIZE.H4, fontWeight: 'bold'}}>
              {item.name}
            </AppText>
          </View>
        </Animated.View>
      );
    }

    return (
      <View
        style={{
          width: sizeItem,
          height: sizeItem,
          marginTop: SIZE.width(1),
          backgroundColor: COLOR.TRANSPARENT,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: SIZE.width(3),
          margin: 5,
        }}></View>
    );
  };

  //Hiển thị danh sách item menu:
  const renderListItemMenu = (listItemMenu) => {
    const numberItem = listItemMenu.length;
    const sizeItem = getHeight(numberItem) - numberItem * SIZE.width(0.6);
    return listItemMenu.map((item, index) => {
      return (
        <TouchableOpacity onPress={pressItem(item)} key={`${index}`}>
          {renderItemMenu(item, sizeItem, numberItem)}
        </TouchableOpacity>
      );
    });
  };

  if (loading) {
    return (
      <View
        style={{
          minHeight: SIZE.height(40),
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Loading></Loading>
      </View>
    );
  }
  return (
    <View
      style={{
        marginTop: SIZE.height(2),
      }}>
      {renderRow()}
    </View>
  );
}
