//Library:
import React, {useEffect, useRef} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {COLOR, SIZE} from '../../../utils';
import hexToRgba from 'hex-to-rgba';
import * as Animatable from 'react-native-animatable';
import AntDesign from 'react-native-vector-icons/AntDesign';

//Setup:
import {GetTimeJapan} from '../../../utils/modules/GetTimeJapan';

//Component:
import {AppText} from '../../../elements/AppText';
import {AppImage} from '../../../elements';

function ItemNoti(props) {
  const {item, index} = props;
  const disableClickItem = useRef(false);
  useEffect(() => {
    return () => {
      clearTimeout(disableClickItem.current);
    };
  }, []);

  const readNoti = async () => {};

  //Hiển thị thời gian bắt đầu thông báo:
  const renderTimeJaPan = (time) => {
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

  //Hiển thị ảnh image hoặc là icon PDF:
  const renderImagesOrIconPDF = () => {
    if (item.typeOpenNoti == 'OPEN_PDF') {
      return (
        <View
          style={{
            height: SIZE.width(20),
            marginRight: SIZE.width(2),
            marginTop: SIZE.width(-4),
          }}>
          <AntDesign
            name="pdffile1"
            size={SIZE.width(10)}
            color={COLOR.main_color_2}
          />
        </View>
      );
    }
    if (item.imageUrl) {
      return (
        <AppImage
          resizeMode="contain"
          source={{uri: item.imageUrl}}
          style={{
            height: SIZE.width(25),
            width: SIZE.width(25),
            margin: SIZE.width(3),
            borderRadius: SIZE.width(3),
          }}
        />
      );
    }
    return null;
  };
  return (
    <>
      <TouchableOpacity onPress={readNoti} activeOpacity={0.8}>
        <Animatable.View
          useNativeDriver={true}
          style={{
            height: SIZE.width(30),
            width: SIZE.width(100),
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor:
              index % 2 == 0 ? hexToRgba(COLOR.red, '0.1') : '#FFFFFF',
          }}
          animation={index % 2 === 0 ? 'fadeInLeft' : 'fadeInRight'}
          contentInsetAdjustmentBehavior="automatic"
          duration={600}
          delay={400}>
          <View
            style={{
              maxWidth: item.imageUrl ? SIZE.width(69) : SIZE.width(70),
            }}>
            {/* Thời gian viết thông báo */}
            {renderTimeJaPan(item.startTime)}
            {/* Tiêu đề bài viết */}
            <AppText
              style={{
                color: COLOR.black,
                fontSize: SIZE.H5 * 1.1,
                marginTop: SIZE.width(1),
                marginLeft: SIZE.width(3),
                marginBottom: SIZE.width(3),
                textDecorationLine: 'underline',
                textDecorationStyle: 'solid',
                textDecorationColor: '#000',
              }}>
              {item.title}
            </AppText>
          </View>
          {/* Phần hiển thị ảnh  */}
          {renderImagesOrIconPDF()}
        </Animatable.View>
      </TouchableOpacity>
    </>
  );
}
export {ItemNoti};
