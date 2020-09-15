import React from 'react';
import {AppIcon} from './AppIcon';
import {TouchableCore} from '../elements/TouchableCore';

const AppIconButton = (props) => {
  const {onPress, icon, style, hitSlop, disabled} = props;
  const {iconName, iconColor, iconSize, iconType} = icon;
  return (
    <TouchableCore
      disabled={disabled}
      onPress={onPress}
      hitSlop={hitSlop}
      style={[
        {
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
        },
        style,
      ]}>
      <AppIcon
        type={iconType}
        icon={iconName}
        iconColor={iconColor}
        iconSize={iconSize}
      />
    </TouchableCore>
  );
};

export {AppIconButton};
