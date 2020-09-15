//Library:
import React, {useContext, useRef, useEffect} from 'react';
import {View, TouchableOpacity, Animated} from 'react-native';

//Setup:
import {SIZE, COLOR} from '../../../utils';
import {ContextContainer} from '../../../contexts/AppContext';

//Component:
import {AppText} from '../../../elements/AppText';
import {GetTimeJapan} from '../../../utils/modules/GetTimeJapan';

function NotiImpotant(props) {
  const {dataImportantNotification} = props;
  const skipAnimation = useRef(new Animated.Value(0)).current;
  const {colorApp} = useContext(ContextContainer);
  const opacity = skipAnimation.interpolate({
    inputRange: [0.3, 1],
    outputRange: [0, 1],
  });

  const translateY = skipAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [50, 0],
  });

  const scale = skipAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      actionAnimation();
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  //Hoạt động Animation:
  const actionAnimation = () => {
    Animated.timing(skipAnimation, {
      toValue: 1,
      duration: 700,
      useNativeDriver: true,
    }).start();
  };

  //Kiểm tra mã hexa thì cho active cấu hình màu sắc noti quan trọng:
  const checkValidColorItemActive = (colorHexa) => {
    if (colorHexa && colorHexa.slice(0, 1) == '#' && colorHexa.length > 4) {
      return colorHexa;
    } else {
      return colorApp.textColor;
    }
  };

  //Hiển thị thời gian bắt đầu thông báo:
  const renderTimeJaPan = (time, colorItem) => {
    return (
      <AppText
        style={{
          color: COLOR.black,
          fontSize: SIZE.H5 * 1.1,
          fontWeight: 'bold',
          marginLeft: SIZE.width(3),
        }}>
        {/* {GetTimeJapan.convertTimeJaPanCreateTime(time)} */}
      </AppText>
    );
  };

  //Tiêu đề thông báo quan trọng:
  const titleNotiImportant = () => {
    return (
      <AppText
        style={{
          fontSize: SIZE.H5 * 1.2,
          color: COLOR.red,
          fontWeight: 'bold',
          margin: SIZE.width(3),
        }}>
        重要なお知らせ
      </AppText>
    );
  };

  //Ấn vào đọc thông báo:
  const readNoti = (item) => async () => {};

  //Item thông báo quan trọng:
  const itemNotiImportant = (item, index) => {
    const colorItem = checkValidColorItemActive(item.color);
    return (
      <TouchableOpacity
        onPress={readNoti(item)}
        key={`${index}`}
        style={{
          minHeight: SIZE.width(12),
          width: SIZE.width(94),
          fontWeight: 'bold',
          marginTop: SIZE.width(1),
        }}>
        {/* Thời gian thông báo */}
        {renderTimeJaPan(item.startTime, colorItem)}
        {/* Tiêu đề ngắn */}
        <AppText
          key={`${index}`}
          style={{
            color: colorItem,
            fontSize: SIZE.H5 * 1.1,
            marginTop: SIZE.width(1),
            marginLeft: SIZE.width(3),
            marginBottom: SIZE.width(3),
            textDecorationLine: 'underline',
            textDecorationStyle: 'solid',
            textDecorationColor: colorItem,
          }}>
          {item.title}
        </AppText>
      </TouchableOpacity>
    );
  };

  //Danh sách thông báo quan trong:
  const listNotiImportant = () => {
    return dataImportantNotification.map((item, index) => {
      return <View key={`${index}`}>{itemNotiImportant(item, index)}</View>;
    });
  };

  return (
    <Animated.View
      style={{
        width: SIZE.width(94),
        backgroundColor: '#FFE2E2',
        borderRadius: SIZE.width(3),
        marginTop: SIZE.width(5),
        marginLeft: SIZE.width(3),
        marginBottom: SIZE.width(5),
        opacity,
        transform: [{translateY}, {scale}],
      }}>
      {/* Tiêu đề thông báo quan trọng */}
      {titleNotiImportant()}
      {/* Danh sách thông báo quan trọng: */}
      {listNotiImportant()}
    </Animated.View>
  );
}

export default NotiImpotant;
