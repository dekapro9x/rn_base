import React from 'react';
import {TouchableOpacity, Platform} from 'react-native';
const TouchableCore = (props) => {
  const {
    children,
    touchStyle,
    style,
    onPress,
    disable,
    disabled,
    onLongPress,
    activeOpacity,
  } = props;
  if (Platform.OS === 'ios') {
    return (
      <TouchableOpacity
        {...props}
        activeOpacity={activeOpacity || 0.8}
        disabled={disable || disabled}
        onPress={onPress}
        style={[styles.touch, touchStyle || style]}
        onLongPress={onLongPress}>
        {children}
      </TouchableOpacity>
    );
  }
  return (
    <TouchableOpacity
      {...props}
      disabled={disable || disabled}
      onPress={onPress}
      style={[styles.touch, touchStyle || style]}
      onLongPress={onLongPress}>
      {children}
    </TouchableOpacity>
  );
};
const styles = {
  touch: {
    justifyContent: 'center',
    alignItems: 'center',
  },
};
export {TouchableCore};
