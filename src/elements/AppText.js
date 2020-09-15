import React from 'react';
import {Text} from 'react-native';
import {SIZE, COLOR} from '../utils/resource';

const AppText = (props) => {
  const {children, style, onPress} = props;
  return (
    <Text
      {...props}
      style={[{fontSize: SIZE.H5, color: COLOR.text_app}, style]}
      onPress={onPress}>
      {children}
    </Text>
  );
};

export {AppText};
