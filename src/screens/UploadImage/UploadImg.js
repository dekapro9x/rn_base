import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {KEY_NAVIGATION} from '../../utils';

export default function UploadImages({navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(KEY_NAVIGATION.video_detail_android);
        }}
        style={{
          height: 50,
          minWidth: 200,
          backgroundColor: 'red',
        }}>
        <Text>Up View Youtube</Text>
      </TouchableOpacity>
    </View>
  );
}
