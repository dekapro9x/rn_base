import React, {Component} from 'react';
import {Text, View} from 'react-native';

export default class Animatable extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <Text> textInComponent </Text>
      </View>
    );
  }
}
