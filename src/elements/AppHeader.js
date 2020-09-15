//Library:
import React, {useRef} from 'react';
import {View, StyleSheet, Animated, SafeAreaView} from 'react-native';
import {useNavigation} from '@react-navigation/native';

//Setup:
import {COLOR, SIZE} from '../utils';

//Component:
import {AppText} from './AppText';
import {AppIconButton} from './AppIconButton';

const AppHeader = (props) => {
  const {
    Left,
    Right,
    Title,
    renderLeftProp,
    leftGoBack,
    onPressLeft,
    title,
    titleStyle,
    numberOfLines,
    renderTitleProp,
    renderRightProp,
    renderView,
    style,
  } = props;
  const visibleTopView = useRef(false);
  const animateValue = useRef(new Animated.Value(0));
  const navigation = useNavigation();

  const onGoBack = () => {
    navigation.goBack();
  };

  const renderLeft = () => {
    if (Left) {
      return (
        <View
          style={{
            flexDirection: 'row',
            position: 'absolute',
            left: SIZE.padding,
          }}>
          {Left}
        </View>
      );
    }
    if (renderLeftProp) {
      return (
        <View
          style={{
            flexDirection: 'row',
            position: 'absolute',
            left: SIZE.padding,
          }}>
          {renderLeftProp()}
        </View>
      );
    }

    if (leftGoBack) {
      const onPress = onPressLeft || onGoBack;
      return (
        <View
          style={{
            flexDirection: 'row',
            position: 'absolute',
            left: SIZE.padding,
          }}>
          <AppIconButton
            hitSlop={{top: 10, bottom: 10, left: 20, right: 20}}
            icon={{
              iconName: 'chevron-thin-left',
              iconType: 'Entypo',
              iconColor: COLOR.main_color,
              iconSize: SIZE.H3,
            }}
            onPress={onPress}
          />
        </View>
      );
    }
    return null;
  };

  const renderTitle = () => {
    if (Title) {
      return Title;
    }
    if (renderTitleProp) {
      return renderTitleProp();
    }
    if (title) {
      return (
        <AppText
          numberOfLines={numberOfLines || 1}
          style={[
            {
              fontSize: SIZE.title_size,
              color: COLOR.main_color,
              paddingVertical: 22,
            },
            titleStyle,
          ]}>
          {title}
        </AppText>
      );
    }
    return null;
  };

  const renderRight = () => {
    if (Right) {
      return (
        <View
          style={{
            flexDirection: 'row',
            position: 'absolute',
            right: SIZE.padding,
            backgroundColor: 'red',
            width: 60,
            height: 60,
          }}>
          {Right}
        </View>
      );
    }
    if (renderRightProp) {
      return (
        <View
          style={{
            flexDirection: 'row',
            position: 'absolute',
            right: SIZE.padding,
          }}>
          {renderRightProp()}
        </View>
      );
    }
    return null;
  };

  const renderTopView = () => {
    const opacity = animateValue.current.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 0.7, 1],
    });
    if (visibleTopView.current && renderView) {
      return (
        <Animated.View
          style={{
            flexDirection: 'row',
            position: 'absolute',
            top: heightHeader,
            width: SIZE.device_width,
            height: SIZE.device_height - heightHeader,
            zIndex: 4,
            minHeight: 50,
            backgroundColor: COLOR.BG_TRANSPARENT_50,
            opacity,
          }}
          pointerEvents={'auto'}
        />
      );
    }
    return null;
  };

  return (
    <SafeAreaView style={[styles.container, style]}>
      {renderLeft()}
      {renderTitle()}
      {renderRight()}
      {renderTopView()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: SIZE.device_width,
    elevation: 3,
    zIndex: 1,
    flexDirection: 'row',
    backgroundColor: COLOR.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: COLOR.BG_TRANSPARENT_70,
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2.4,
    },
    shadowOpacity: 0.22,
    shadowRadius: 1.4,
  },
});
export {AppHeader};
