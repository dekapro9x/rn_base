import React, {PureComponent} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import IconMaitain from 'react-native-vector-icons/FontAwesome';
import {COLOR, SIZE, STRING} from '../utils';
import {AppText} from './AppText';

export class NetworkError extends PureComponent {
  renderIcon = () => {
    const {iconName, iconSize, disableIcon} = this.props;
    if (disableIcon) {
      return null;
    }
    if (iconName === 'gears') {
      return (
        <IconMaitain
          name={iconName}
          size={iconSize || 80}
          color={COLOR.COLOR_GRAY}
        />
      );
    }
    return (
      <Feather
        name={iconName || 'wifi-off'}
        size={iconSize || 80}
        color={COLOR.COLOR_GRAY}
      />
    );
  };
  render() {
    const {onPress, textStyle, title} = this.props;
    return (
      <View
        activeOpacity={0.2}
        style={[styles.wrapperCenter, this.props.style]}>
        <View style={[styles.wrapperCenter]}>
          {this.renderIcon()}
          <AppText style={[styles.textError, textStyle]}>
            {title || STRING.network_error_try_again_later}
          </AppText>
        </View>
        <TouchableOpacity
          onPress={onPress}
          style={{
            height: SIZE.width(12),
            width: SIZE.width(84),
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: SIZE.width(4),
            borderRadius: 8,
            backgroundColor: COLOR.gray_light,
          }}>
          <AppText style={{fontSize: SIZE.H4 * 0.9, color: COLOR.red_light}}>
            再読込み
          </AppText>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapperCenter: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    width: '100%',
  },
  textError: {
    // paddingHorizontal: 16,
    marginTop: 20,
    color: COLOR.COLOR_GRAY,
    fontSize: 20,
    textAlign: 'center',
  },
});
