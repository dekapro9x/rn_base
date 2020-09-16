//Library:
import React, {useEffect, useState, useContext} from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/core';

//Setup:
import {SIZE, COLOR} from '../../utils';
import {GetTimeJapan} from '../../utils/modules/GetTimeJapan';

//Component:
import {AppContainer, Loading} from '../../elements';
import {AppImageZoom} from '../../elements/AppImageZoom';
import {TextTime} from '../../elements/TextTime';
import {AppText} from '../../elements/AppText';
import WebViewComponent from '../../elements/WebViewComponent';
import {NetworkError} from '../../elements/NetworkError';
import {FetchApi} from '../../utils/modules/FetchAPI';

function NotificationDetail({route}) {
  const [nameScreen, setStateNameScreen] = useState('');
  const [data, setStateData] = useState({});
  const {item, nameScreenDetail} = route.params.data;
  const [loading, setStateLoading] = useState(true);
  const [errorView, setStateErrorView] = useState(false);
  const navigation = useNavigation();
  const getNameScreenDetail = () => {
    setStateNameScreen(nameScreenDetail);
  };

  useEffect(() => {
    getNameScreenDetail();
    getDetailNoti();
    return () => {};
  }, []);

  //Gọi API lấy chi tiết thông báo:
  const getDetailNoti = async () => {
    setStateLoading(true);
    const response = await FetchApi.getDetailNoti(item.id);
    if (response.status_code == 200 && response.code == 1000) {
      setStateData(response.data);
      setStateLoading(false);
      setStateErrorView(false);
    } else {
      setStateErrorView(true);
      setStateLoading(false);
    }
  };

  //Kiểm tra mã hexa thì cho active cấu hình màu sắc noti quan trọng:
  const checkValidColorItemActive = (colorHexa) => {
    if (colorHexa && colorHexa.slice(0, 1) == '#' && colorHexa.length > 4) {
      return colorHexa;
    } else {
      return COLOR.black;
    }
  };

  //Hiển thị nội dung của thông báo:
  const renderTitleNoti = () => {
    let colorTitle = COLOR.black;
    if (data && data.type == 'IMPORTANT') {
      colorTitle = checkValidColorItemActive(data.color);
    }
    if (loading) {
      return <Loading />;
    }
    if (errorView) {
      return (
        <NetworkError
          title={
            'ただいま大変混み合っております。しばらく経ってから再度お試しください。'
          }
          onPress={() => getDetailNoti()}
        />
      );
    }
    return (
      <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
        {/* Phần hiển thị ảnh noti: */}
        <View
          style={{
            flex: 1,
            marginTop: SIZE.width(1),
          }}>
          {data.imageUrl ? (
            <AppImageZoom
              useAutoHight
              url={data.imageUrl}
              resizeMode={'cover'}
              style={{
                marginTop: SIZE.width(3),
                marginLeft: SIZE.width(2),
                width: SIZE.width(96),
                borderRadius: SIZE.width(5),
              }}
            />
          ) : null}
        </View>
        {/* Phần hiển thị nội dung  */}
        <View style={{marginTop: SIZE.width(3)}}>
          {/* Thời gian bắt đầu */}
          <TextTime
            styleContainer={{
              marginLeft: SIZE.width(2),
              color: COLOR.black,
              fontSize: SIZE.H5 * 1.2,
              fontWeight: 'bold',
            }}
            time={`${GetTimeJapan.convertTimeJaPanCreateTime(data.startTime)} `}
          />
          {/* Tiêu đề */}
          <AppText
            style={{
              color: colorTitle,
              fontSize: SIZE.H5 * 1.2,
              fontWeight: 'bold',
              marginTop: SIZE.width(3),
              marginLeft: SIZE.width(4),
              marginRight: SIZE.width(4),
            }}>
            {data.title}
          </AppText>
          {/* Viền xanh: */}
          <View
            style={{
              height: SIZE.width(0.8),
              width: SIZE.width(94),
              borderRadius: 5,
              marginLeft: SIZE.width(3),
              marginTop: SIZE.width(3),
              backgroundColor: COLOR.milk,
            }}
          />
          {/* Khung HTML */}
          <View
            style={{
              marginTop: SIZE.width(5),
              marginLeft: SIZE.width(5),
              marginRight: SIZE.width(5),
            }}>
            <WebViewComponent html={data.content} navigation={navigation} />
          </View>
        </View>
      </ScrollView>
    );
  };
  return (
    <AppContainer
      haveTitle
      goBackScreen
      nameScreen={nameScreen}
      style={{backgroundColor: COLOR.milk}}>
      {renderTitleNoti()}
    </AppContainer>
  );
}

//Styles:
const styles = StyleSheet.create({
  title: {
    color: COLOR.black,
    fontSize: SIZE.H5 * 1.2,
    fontWeight: 'bold',
    marginTop: SIZE.width(3),
    marginLeft: SIZE.width(4),
    marginRight: SIZE.width(4),
  },
  imageFeature: {
    width: SIZE.width(100),
    flex: 1,
    height: SIZE.width(100),
    position: 'relative',
  },
});

export default NotificationDetail;
