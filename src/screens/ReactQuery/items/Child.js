import React from 'react';
import {Text, View} from 'react-native';

export default function Child() {
  return (
    <View
      style={{
        height: 100,
        width: 200,
        backgroundColor: 'green',
        marginTop: 400,
      }}>
      <Text> textInComponent </Text>
    </View>
  );
}
