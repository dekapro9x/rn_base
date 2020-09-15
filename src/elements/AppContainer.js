//Library:
import React, {useContext, useState, useRef, useEffect} from 'react';
import {
  StatusBar,
  StyleSheet,
  SafeAreaView,
  View,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import Entypo from 'react-native-vector-icons/Entypo';

//Setup:
import {SIZE, COLOR} from '../utils/resource';
import {ContextContainer} from '../contexts/AppContext';

//Component:
import {AppImage} from './AppImage';
import {AppText} from './AppText';

const AppContainer = (props) => {
  const {logoApp} = useContext(ContextContainer);
  const {
    children,
    style,
    noHeader,
    goBackScreen,
    haveTitle,
    rightTitle,
    midTitle,
    nameScreen,
    warningGoback,
    textWairning,
  } = props;
  const navigation = useNavigation();
  const {goBack} = navigation;
  const timeCountActive = useRef(0);
  const [active, setActive] = useState(false);
  useEffect(() => {
    return () => {
      clearTimeout(timeCountActive.current);
    };
  }, []);

  const onPressGoBack = () => {
    setActive(true);
    timeCountActive.current = setTimeout(() => {
      setActive(false);
    }, 1000);
    if (warningGoback) {
      Alert.alert(
        `${textWairning}`,
        '',
        [
          {
            text: 'キャンセル',
            style: 'cancel',
          },
          {
            text: 'OK',
            style: 'cancel',
            onPress: () => {
              goBack();
            },
          },
        ],
        {cancelable: false},
      );
    } else {
      goBack();
    }
  };

  //Nút quay lại
  const renderButtonGoBack = () => {
    return (
      <>
        {goBackScreen ? (
          <TouchableOpacity
            disabled={active}
            onPress={onPressGoBack}
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Entypo
              style={{marginLeft: SIZE.width(2)}}
              name="chevron-left"
              size={18}
              color={COLOR.black}
            />
            <AppText style={{fontSize: SIZE.H5 * 1.2}}>戻る</AppText>
          </TouchableOpacity>
        ) : (
          <View style={{flex: 1}} />
        )}
      </>
    );
  };

  //Giữa
  const renderMidTitle = () => {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          minWidth: SIZE.width(20),
          justifyContent: 'center',
        }}>
        {midTitle ? (
          midTitle
        ) : (
          <AppText
            style={{
              fontSize:
                nameScreen && nameScreen.length > 7 ? SIZE.H5 * 1.2 : SIZE.H4,
              fontWeight: 'bold',
            }}>
            {nameScreen}
          </AppText>
        )}
      </View>
    );
  };

  //Phải:
  const renderRightTitle = () => {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {rightTitle}
      </View>
    );
  };

  const renderTitle = () => {
    return (
      <View style={{backgroundColor: COLOR.white}}>
        {!noHeader && (
          <View
            style={{
              height: SIZE.width(12),
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
            }}>
            <AppImage
              source={{
                uri: logoApp,
              }}
              style={{
                height: SIZE.icon_button * 2,
                width: SIZE.width(60),
                alignSelf: 'center',
              }}
              resizeMode="contain"
            />
          </View>
        )}
        {haveTitle ? (
          <View
            style={{
              height: SIZE.width(9),
              width: SIZE.width(100),
              justifyContent: 'space-between',
              flexDirection: 'row',
              borderBottomWidth: StyleSheet.hairlineWidth,
              borderColor: COLOR.grey_500,
            }}>
            {renderButtonGoBack()}
            {renderMidTitle()}
            {renderRightTitle()}
          </View>
        ) : null}
      </View>
    );
  };

  return (
    <SafeAreaView style={[styles.container, style]}>
      <StatusBar barStyle={'dark-content'} />
      {renderTitle()}
      {children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.white,
    justifyContent: 'flex-start',
  },
});
export {AppContainer};
