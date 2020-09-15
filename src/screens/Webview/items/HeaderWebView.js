//Library:
import React, {useState, useImperativeHandle} from 'react';
import {View} from 'react-native';
import {useNavigation} from '@react-navigation/core';

//Setup:
import {SIZE, COLOR} from '../../../utils';

//Component:
import {AppIconButton} from '../../../elements';

const HeaderWebView = ({webView}, ref) => {
  const navigation = useNavigation();
  const [webNavigation, setWebNavigation] = useState({
    canGoBack: false,
    canGoForward: false,
  });

  useImperativeHandle(ref, () => ({
    onChangeNavigaton,
  }));

  const onChangeNavigaton = (data) => {
    setWebNavigation(data);
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        paddingVertical: 6,
        paddingHorizontal: 18,
        justifyContent: 'space-between',
        backgroundColor: COLOR.white,
      }}>
      <View
        style={{
          width: SIZE.width(14),
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <AppIconButton
          disabled={!webNavigation.canGoBack}
          hitSlop={{top: 10, bottom: 10, left: 20, right: 20}}
          icon={{
            iconName: 'arrowleft',
            iconType: 'AntDesign',
            iconColor: webNavigation.canGoBack
              ? COLOR.grey_800
              : COLOR.grey_400,
            iconSize: SIZE.icon_button,
          }}
          onPress={() => {
            webView.current.goBack();
          }}
        />
        <AppIconButton
          disabled={!webNavigation.canGoForward}
          hitSlop={{top: 10, bottom: 10, left: 20, right: 20}}
          icon={{
            iconName: 'arrowright',
            iconType: 'AntDesign',
            iconColor: webNavigation.canGoForward
              ? COLOR.grey_800
              : COLOR.grey_400,
            iconSize: SIZE.icon_button,
          }}
          onPress={() => webView.current.goForward()}
        />
      </View>
      <AppIconButton
        hitSlop={{top: 10, bottom: 10, left: 20, right: 20}}
        icon={{
          iconName: 'close',
          iconType: 'AntDesign',
          iconColor: COLOR.grey_800,
          iconSize: SIZE.icon_button,
        }}
        onPress={() => navigation.goBack()}
      />
    </View>
  );
};

export default React.forwardRef(HeaderWebView);
