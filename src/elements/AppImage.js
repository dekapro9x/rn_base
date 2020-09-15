import React, {PureComponent} from 'react';
import {View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Loading} from './Loading';
import {COLOR} from '../utils/resource';

class AppImage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      height: this.props.style.height,
    };
  }
  getResizeMode = (resizeMode) => {
    switch (resizeMode) {
      case 'cover':
        return FastImage.resizeMode.cover;
      case 'center':
        return FastImage.resizeMode.center;
      case 'stretch':
        return FastImage.resizeMode.stretch;
      default:
        return FastImage.resizeMode.contain;
    }
  };
  isValidUrl = (url) => {
    return (
      url.match(/\.(jpeg|jpg|gif|png|JPEG|JPG|PNG)$/) != null &&
      url.includes('http')
    );
  };
  render() {
    const {
      resizeMode = 'contain',
      style,
      source,
      defaultSource,
      sizeSpinner,
    } = this.props;
    const {loading} = this.state;
    if (source && source.uri === null) {
      return (
        <View
          style={[
            {
              width: 86,
              height: 86,
              backgroundColor: COLOR.grey_300,
            },
            style,
          ]}
        />
      );
    }

    //make loading animation while loading image
    if (loading) {
      return (
        <View>
          <FastImage
            defaultSource={defaultSource}
            style={[{width: 86, height: 86}, style]}
            source={source}
            resizeMode={this.getResizeMode(resizeMode)}
            onLoadEnd={() => {
              this.setState({loading: false});
            }}
            onError={() => {
              this.setState({loading: false});
            }}
          />
          <Loading
            sizeSpinner={sizeSpinner}
            style={[
              {
                width: 86,
                height: 86,
                position: 'absolute',
                top: 0,
                left: 0,
              },
              style,
            ]}
          />
        </View>
      );
    }

    //render image after loading image
    return (
      <FastImage
        defaultSource={defaultSource}
        style={[
          {
            width: 50,
            height: 50,
            overflow: 'hidden',
          },
          style,
        ]}
        source={source}
        resizeMode={this.getResizeMode(resizeMode)}
      />
    );
  }
}
export {AppImage};
