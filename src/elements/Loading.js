import React from 'react';
import {View, Dimensions, Platform} from 'react-native';
import Spinner from 'react-native-spinkit';
import {COLOR} from '../utils/resource';
const {width} = Dimensions.get('window');

const Loading = (props) => {
  const {style, sizeSpinner} = props;
  const isAndroid = Platform.OS === 'android';
  const loadingType = 'Wave';
  const size = isAndroid ? 36 : 24;
  return (
    <View
      style={[
        {
          flex: 1,
          width,
          backgroundColor: COLOR.TRANSPARENT,
          justifyContent: 'center',
          alignItems: 'center',
        },
        style,
      ]}>
      <Spinner
        size={sizeSpinner || size}
        type={loadingType}
        color={COLOR.milk}
      />
    </View>
  );
};

export {Loading};
