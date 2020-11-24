import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {View, TouchableOpacity} from 'react-native';
import {COLOR, SIZE} from '../../../utils';

export default function AuFacebook(props) {
  const {unShowModal} = props;

  const pressActiveAccountDemo = () => {};
  //Nút tắt modal và nút tự động get tài khoản:
  const headerButtonModalAndGetAccount = () => {
    return (
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          onPress={unShowModal}
          style={{
            height: SIZE.width(15),
            width: SIZE.width(15),
          }}>
          <AntDesign
            name={'closesquare'}
            color={COLOR.grey_300}
            size={45}></AntDesign>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={pressActiveAccountDemo}
          style={{
            height: SIZE.width(15),
            width: SIZE.width(15),
            marginLeft: SIZE.width(70),
          }}>
          <AntDesign
            name={'login'}
            color={COLOR.grey_300}
            size={45}></AntDesign>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View>
      {headerButtonModalAndGetAccount()}
      <View style={{flex: 1, backgroundColor: COLOR.white}}></View>
    </View>
  );
}
