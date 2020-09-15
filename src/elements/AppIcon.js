import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';

import {SIZE, COLOR} from '../utils';

const getSize = (type, iconSize) => {
  if (iconSize) {
    return iconSize;
  }
  switch (type) {
    case 'Ionicons':
      return SIZE.icon_size_ionicons;
    default:
      return SIZE.icon_size;
  }
};
const Icon = (props) => {
  const {type, icon, iconColor} = props;

  const iconSize = getSize(type, props.iconSize);

  switch (type) {
    case 'AntDesign':
      return (
        <AntDesign
          {...props}
          name={icon}
          size={iconSize || SIZE.icon_size}
          color={iconColor || COLOR.grey_700}
        />
      );
    case 'FontAwesome':
      return (
        <FontAwesome
          {...props}
          name={icon}
          size={iconSize || SIZE.icon_size}
          color={iconColor || COLOR.grey_700}
        />
      );
    case 'Feather':
      return (
        <Feather
          name={icon}
          size={iconSize || SIZE.icon_size}
          color={iconColor || COLOR.grey_700}
        />
      );
    case 'Entypo':
      return (
        <Entypo
          {...props}
          name={icon}
          size={iconSize || SIZE.icon_size}
          color={iconColor || COLOR.grey_700}
        />
      );

    case 'Octicons':
      return (
        <Octicons
          {...props}
          name={icon}
          size={iconSize || SIZE.icon_size}
          color={iconColor || COLOR.grey_700}
        />
      );
    case 'MaterialIcons':
      return (
        <MaterialIcons
          {...props}
          name={icon}
          size={iconSize || SIZE.icon_size}
          color={iconColor || COLOR.grey_700}
        />
      );
    case 'MaterialCommunityIcons':
      return (
        <MaterialCommunityIcons
          {...props}
          name={icon}
          size={iconSize || SIZE.icon_size}
          color={iconColor || COLOR.grey_700}
        />
      );
    case 'Fontisto':
      return (
        <Fontisto
          {...props}
          name={icon}
          size={iconSize || SIZE.icon_size}
          color={iconColor || COLOR.grey_700}
        />
      );
    default:
      return (
        <Ionicons
          {...props}
          name={icon}
          size={iconSize || SIZE.icon_size}
          color={iconColor || COLOR.grey_700}
        />
      );
  }
};
/**
 * type, icon, iconSize, iconColor, style
 * @param {*} props
 */
const AppIcon = (props) => Icon(props);

export {AppIcon};
