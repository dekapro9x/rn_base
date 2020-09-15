import React, {PureComponent, Fragment} from 'react';
import {View} from 'react-native';
import {TouchableCore, Loading, AppImage} from '../elements';
import {COLOR, SIZE} from '../utils/resource';
import {AppText} from './AppText';

class AppImageWithTextButton extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {loading: false};
  }
  componentDidMount() {
    const {onRef} = this.props;
    if (onRef) {
      onRef(this);
    }
  }
  onPress = () => {
    const {onPress} = this.props;
    const {loading} = this.state;
    if (loading) {
      return;
    }
    if (onPress) {
      onPress();
    }
  };
  setLoadingValue = (loading) => {
    this.setState({loading});
  };
  getLoadingValue = () => this.state.loading;

  renderContent = () => {
    const {
      title,
      styleLoading,
      colorLoading,
      textStyle,
      source,
      styleImage,
    } = this.props;
    const {loading} = this.state;
    if (loading) {
      return (
        <Loading
          sizeSpinner={SIZE.header_font_size}
          style={[{width: undefined}, styleLoading]}
          color={colorLoading || COLOR.white}
        />
      );
    }

    return (
      <Fragment>
        {!!source && (
          <AppImage
            resizeMethod={'contain'}
            source={source}
            style={{width: 42, height: 42, ...styleImage}}
          />
        )}
        {!!title && (
          <AppText
            numberOfLines={1}
            style={{
              marginTop: SIZE.width(2),
              fontSize: SIZE.H6,
              color: COLOR.black,
              textAlign: 'center',
              ...textStyle,
            }}>
            {title}
          </AppText>
        )}
      </Fragment>
    );
  };
  render() {
    const {style, hitSlop} = this.props;
    const {loading} = this.state;
    return (
      <TouchableCore
        onPress={this.onPress}
        disabled={loading}
        hitSlop={hitSlop}>
        <View
          style={[
            {
              alignItems: 'center',
              justifyContent: 'flex-end',
            },
            style,
          ]}>
          {this.renderContent()}
        </View>
      </TouchableCore>
    );
  }
}

export {AppImageWithTextButton};
