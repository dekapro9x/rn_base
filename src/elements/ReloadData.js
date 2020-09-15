import React, {PureComponent} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconMaitain from 'react-native-vector-icons/FontAwesome';
import {COLOR} from '../utils';
import {AppText} from './AppText';

export default class ReloadDataScreen extends PureComponent {
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
          color={COLOR.grey_500}
        />
      );
    }
    return (
      <Icon
        name={iconName || 'wifi-off'}
        size={iconSize || 80}
        color={COLOR.grey_500}
      />
    );
  };
  render() {
    const {onPress, textStyle, title, disabled} = this.props;
    return (
      <TouchableOpacity
        disabled={disabled ? true : false}
        onPress={onPress}
        activeOpacity={0.2}
        style={[styles.wrapperCenter, this.props.style]}>
        <View style={[styles.wrapperCenter]}>
          {this.renderIcon()}
          <AppText style={[styles.textError, textStyle]}>
            {title ||
              'ただいま大変混み合っております。しばらく経ってから再度お試しください。'}
          </AppText>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  wrapperCenter: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    width: '100%',
  },
  textError: {
    marginTop: 20,
    color: COLOR.grey_500,
    fontSize: 20,
    textAlign: 'center',
  },
});
