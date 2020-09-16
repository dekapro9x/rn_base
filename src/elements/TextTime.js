import React, {PureComponent} from 'react';
import {View, StyleSheet} from 'react-native';
import {AppText} from './AppText';
const styles = StyleSheet.create({
  itemRightBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 20,
  },
});

export class TextTime extends PureComponent {
  render() {
    const {time, styleContainer} = this.props;
    return (
      <View style={[styles.itemRightBottom, {...styleContainer}]}>
        <AppText
          style={[
            {fontSize: 13, color: '#000000', fontWeight: 'bold'},
            {...styleContainer},
          ]}>
          {time}
        </AppText>
      </View>
    );
  }
}
