import React, {useState, useImperativeHandle} from 'react';
import {StyleSheet} from 'react-native';
import {TouchableCore} from './TouchableCore';
import {COLOR, SIZE} from '../utils/resource';
import {AppText} from './AppText';
import {Loading} from './Loading';

const AppTextButton = React.forwardRef((props, ref) => {
  const [loading, setLoading] = useState(false);

  useImperativeHandle(ref, () => ({
    setLoadingValue,
  }));

  const onPress = () => {
    const {onPress} = props;

    if (loading) {
      return;
    }
    if (onPress) {
      onPress();
    }
  };

  const setLoadingValue = (loading) => {
    setLoading(loading);
  };

  const renderContent = () => {
    const {title, textStyle, disabled, colorSpinner, sizeSpinner} = props;

    const styleDisabled = disabled ? styles.textDisabled : undefined;
    if (loading) {
      return (
        <Loading
          style={{width: undefined}}
          color={colorSpinner}
          sizeSpinner={sizeSpinner}
        />
      );
    }
    return (
      <AppText
        style={[
          {color: COLOR.black, fontSize: SIZE.header_font_size},
          textStyle,
          styleDisabled,
        ]}>
        {title}
      </AppText>
    );
  };

  const {style, disabled} = props;
  const disabledStyle = disabled ? styles.touchDisabled : undefined;
  return (
    <TouchableCore
      onPress={onPress}
      disabled={disabled}
      style={[
        {
          padding: SIZE.padding / 2,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 5,
        },
        style,
        disabledStyle,
      ]}>
      {renderContent()}
    </TouchableCore>
  );
});

const styles = StyleSheet.create({
  touchDisabled: {
    borderColor: COLOR.grey_500,
    backgroundColor: COLOR.grey_500,
  },
  textDisabled: {
    color: COLOR.white,
  },
});

export {AppTextButton};
