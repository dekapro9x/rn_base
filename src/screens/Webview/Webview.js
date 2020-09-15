//Library:
import React, {useRef, useEffect, useState} from 'react';
import {View, SafeAreaView, StyleSheet} from 'react-native';
import WebView from 'react-native-webview';
import Pdf from 'react-native-pdf';

//Setup:
import {COLOR, SIZE, isIos} from '../../utils';

//Component:
import HeaderWebView from './items/HeaderWebView';

const WebViewScreen = ({route}) => {
  const [errorPDF, setStateErrorPDF] = useState(false);
  const webViewRef = useRef(null);
  const headerRef = useRef(null);
  const {data} = route.params;
  useEffect(() => {}, []);

  const renderContent = () => {
    if (data.url.includes('.pdf')) {
      const source = {
        uri: encodeURI(data.url),
        cache: true,
      };
      if (errorPDF) {
        // return <NetworkError title={STRING.network_error_try_again_later} />;
      }
      return (
        <View
          style={{
            height: SIZE.height(100),
            width: SIZE.width(100),
            justifyContent: 'flex-start',
            backgroundColor: COLOR.grey_300,
            alignItems: 'center',
          }}>
          <Pdf
            spacing={0}
            source={source}
            onError={(error) => {
              if (error) {
                setStateErrorPDF(true);
              }
            }}
            style={[
              styles.pdf,
              {
                height: isIos ? SIZE.height(86) : SIZE.height(93.2),
                width: SIZE.width(96),
                marginTop: SIZE.height(0.3),
              },
            ]}
          />
          <SafeAreaView></SafeAreaView>
        </View>
      );
    }
    return (
      <WebView
        ref={webViewRef}
        containerStyle={{overflow: 'hidden'}}
        style={{opacity: 0.99}}
        allowFileAccessFromFileURLs={true}
        startInLoadingState={true}
        javaScriptEnabled={true}
        onMessage={(e) => {
          if (e.nativeEvent) {
          }
        }}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        source={{
          uri: data.url,
        }}
        originWhitelist={['https://*', 'http://', 'file://']}
        onNavigationStateChange={(navState) => {
          headerRef.current.onChangeNavigaton(navState);
        }}
        onError={(syntheticEvent) => {}}
      />
    );
  };

  return (
    <>
      <SafeAreaView style={{flex: 0, backgroundColor: COLOR.white}} />
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-start',
          backgroundColor: COLOR.dark,
        }}>
        <HeaderWebView webView={webViewRef} ref={headerRef} />
        {renderContent()}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.white,
  },
  pdf: {
    width: '100%',
    height: '50%',
    paddingTop: 0,
    backgroundColor: COLOR.white,
  },
});

export default WebViewScreen;
