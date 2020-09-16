//Library:
import React from 'react';
import PropTypes from 'prop-types';
import {View, ViewPropTypes, Image} from 'react-native';
import HTML from 'react-native-render-html';

//Setup:
//Component:
import {Loading} from './Loading';
import {KEY_NAVIGATION, SIZE} from '../utils';

export default class AutoHeightWebView extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      contentHeight: 100,
      reloadWebview: true,
    };
  }

  static propTypes = {
    style: ViewPropTypes.style || View.propTypes.style,
    LoadingViewComponent: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.func,
    ]),
    onLoad: PropTypes.func,
  };

  renderLoadingView() {
    const {LoadingViewComponent} = this.props;
    if (!this.state.contentHeight && LoadingViewComponent) {
      return React.isValidElement(LoadingViewComponent) ? (
        LoadingViewComponent
      ) : (
        <Loading />
      );
    }
  }

  onLinkPress = (event, link) => {
    //Lưu ý event là 1 biến lắng nghe sự kiện pressLink, bỏ đi sẽ không mở được link
    //Không được phép xóa biến này :event
    const {navigation} = this.props;
    let pos = `${link}`;
    let res = `${pos.substring(0, 4)}`;
    if (link && link != 'javascript:void(0)') {
      if (`${res}` === 'http') {
        navigation.navigate(KEY_NAVIGATION.WEBVIEW, {data: {url: link}});
      }
    }
  };

  render() {
    const defaultRenderer = {
      renderers: {
        img: (htmlAttribs, children, convertedCSSStyles, passProps) => {
          return (
            <Image
              key={passProps.key}
              style={{
                width: SIZE.width(90),
                height: SIZE.width(50),
                marginBottom: SIZE.width(2),
              }}
              source={{uri: htmlAttribs.src}}
            />
          );
        },
      },
    };
    const {html} = this.props;
    if (!html) {
      return null;
    }
    return (
      <HTML
        onLinkPress={this.onLinkPress}
        html={html}
        imagesMaxWidth={SIZE.width(90)}
        {...defaultRenderer}
      />
    );
  }
}
