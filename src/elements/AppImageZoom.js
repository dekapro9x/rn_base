//Library:
import React, {PureComponent} from 'react';
import {TouchableOpacity, Modal, View, Image, Animated} from 'react-native';
import FastImage from 'react-native-fast-image';
import ImageViewer from 'react-native-image-zoom-viewer';

//Setup:
import {SIZE, COLOR} from '../utils';

//Component:
import {Loading} from './Loading';

export class AppImageZoom extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      loading: true,
      width: 0,
      height: new Animated.Value(0),
    };
    if (this.props.style && this.props.style.height) {
      this.state.height = new Animated.Value(this.props.style.height);
    }
  }
  componentDidMount() {
    const {onRef, useAutoHight, style} = this.props;
    onRef && onRef(this);
    if (this.props.useAutoHight) {
      const {url, onLoadEnd} = this.props;
      Image.getSize(url, (width, height) => {
        if (useAutoHight && style && style.width) {
          const heightImage = (height / width) * style.width;
          onLoadEnd && onLoadEnd();
          Animated.timing(this.state.height, {
            toValue: heightImage,
            duration: 500,
            // useNativeDriver: true,
          }).start();
        }
      });
    }
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  getResizeMode = (resizeMode) => {
    switch (resizeMode) {
      case 'cover':
        return FastImage.resizeMode.cover;
      default:
        return FastImage.resizeMode.contain;
    }
  };
  getUseImage = () => {
    const {resizeMode, style, url, useAutoHight} = this.props;
    const uri = url;
    if (useAutoHight) {
      return (
        <Animated.Image
          onLoadEnd={() => {
            this.setState({loading: false});
          }}
          style={[style, {height: this.state.height}]}
          source={{uri: uri}}
        />
      );
    }
    return (
      <FastImage
        style={style}
        onLoadEnd={() => {
          this.setState({loading: false});
        }}
        source={{uri: uri}}
        resizeMode={this.getResizeMode(resizeMode)}
        {...this.props}
      />
    );
  };

  render() {
    const {style, url, useZoom, onPress, source} = this.props;
    const {modalVisible} = this.state;
    const uri = url;
    let sourceImage;
    if (source) {
      sourceImage = source;
    } else {
      sourceImage = {uri: uri};
    }
    if (useZoom) {
      return (
        <View>
          {this.state.loading && !source ? (
            <View
              style={{
                width: SIZE.width(100),
                height: SIZE.width(100),
                position: 'absolute',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Loading />
            </View>
          ) : null}
          <TouchableOpacity
            activeOpacity={0.8}
            style={[style]}
            onPress={() => {
              onPress && onPress();
              this.setModalVisible(!this.state.modalVisible);
            }}>
            {this.getUseImage()}
            {modalVisible && useZoom ? (
              <Modal
                onRequestClose={() => {
                  this.setModalVisible(false);
                }}
                transparent={false}
                visible={this.state.modalVisible}>
                <ImageViewer
                  disableNumber
                  loadingRender={() => (
                    <Loading
                      style={{width: SIZE.width(100), height: SIZE.height(100)}}
                      color={COLOR.white}
                    />
                  )}
                  onClick={() => {
                    this.setModalVisible(!this.state.modalVisible);
                  }}
                  imageUrls={[{url: uri}]}
                />
              </Modal>
            ) : null}
          </TouchableOpacity>
        </View>
      );
    }
    return (
      <View>
        {this.state.loading && !source ? (
          <View
            style={[
              this.props.style,
              {
                position: 'absolute',
                justifyContent: 'center',
                alignItems: 'center',
              },
            ]}>
            <Loading />
          </View>
        ) : null}
        {this.getUseImage()}
      </View>
    );
  }
}
