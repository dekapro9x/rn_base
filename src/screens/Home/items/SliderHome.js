//Library:
import React from 'react';
import {View, StyleSheet} from 'react-native';
import Swiper from 'react-native-swiper';

//Setup:
import {SIZE, COLOR} from '../../../utils';

//Component:
import {AppImage} from '../../../elements';

const SliderHome = (props) => {
  const {dataSlider} = props;

  //Danh sách Slider:
  const listSlider = () => {
    const listSlider = dataSlider.map((item, index) => {
      return (
        <View
          key={`${index}`}
          style={{
            height: (SIZE.device_width * 9) / 16,
            width: '100%',
          }}>
          <AppImage
            source={{
              uri: item.img,
            }}
            style={{
              height: (SIZE.device_width * 9) / 16,
              width: '100%',
              alignSelf: 'center',
            }}
            resizeMode="cover"
          />
        </View>
      );
    });
    return listSlider;
  };

  return (
    <Swiper
      //renderPagination Dùng để custom lại Slider với index dot tương ứng, với tỷ lệ khung hình mà không bị vượt quá giới hạn cho phép.
      // Slider bao gồm cả Ảnh hiển thị và dấu chấm index.
      renderPagination={(indexActive, total, context) => {
        return (
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: COLOR.gray_light,
              justifyContent: 'center',
              alignItems: 'center',
              paddingVertical: 6,
            }}>
            {Array(total)
              .fill(null)
              .map((item, index) => {
                if (index === indexActive) {
                  return (
                    <View
                      key={`${index}`}
                      style={styles.dotStyle}
                      item={item}
                    />
                  );
                }
                return (
                  <View
                    key={`${index}`}
                    style={styles.activeDotStyle}
                    item={item}
                  />
                );
              })}
          </View>
        );
      }}
      loop={true}
      autoplayTimeout={3}
      horizontal={true}
      autoplay={true}>
      {listSlider()}
    </Swiper>
  );
};

const styles = StyleSheet.create({
  activeDotStyle: {
    height: 10,
    width: 10,
    borderRadius: 5,
    marginHorizontal: 3,
    backgroundColor: COLOR.COLOR_YELLOW,
  },
  dotStyle: {
    height: 10,
    width: 10,
    borderRadius: 5,
    marginHorizontal: 3,
    backgroundColor: COLOR.white,
  },
});

//Dùng React.memo() hạn chế render lại Component nếu props không thay đổi.
export default React.memo(SliderHome);

//Lưu ý :
//Slider của app này không còn được lấy trong useContext vì nó sẽ được hiển thị chỉ định cho từng user theo favorite và categori:
