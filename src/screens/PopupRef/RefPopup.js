import React, {useRef} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {SIZE} from '@src/utils';
import PopupRef from '../../elements/PopupRef';

export default function RefPopup() {
  const refPopup = useRef(null);

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <TouchableOpacity
        onPress={() => {
          refPopup.current.openModal();
        }}
        style={{
          height: SIZE.height(15),
          width: SIZE.width(45),
          backgroundColor: 'red',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: SIZE.width(5),
        }}>
        <Text style={{color: 'white'}}>Ấn vào để mở ref popup:</Text>
        <PopupRef ref={refPopup}></PopupRef>
      </TouchableOpacity>
    </View>
  );
}
