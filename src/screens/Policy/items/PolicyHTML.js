//Library:
import React, {useRef} from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import HTML from 'react-native-render-html';
//Setup:
import {COLOR, SIZE, KEY_NAVIGATION} from '../../../utils';

//Data:
import {DATA_POLICY} from './DataPolicy';
import {AppTextButton} from '../../../elements/AppTextButton';

export default function PolicyHTML({navigation}) {
  const showButton = useRef(true);
  const convertHtmlContent = (content) => {
    const customContent = content
      ? content
          .replace(/(<p><em>)/gm, '<em>')
          .replace(/(<\/p><\/em>)/gm, '</em>')
          .replace(/(<p><i>)/gm, '<i>')
          .replace(/(<\/p><\/i>)/gm, '</i>')
          .replace(/(\n)/gm, '<br />')
          .replace(/(<br \/><br \/>)/gm, '<br/ >')
      : '';
    return `<div>${customContent}</div>`;
  };
  //Đồng ý và bắt đầu dùng app.
  const onPressAcceptPolicy = () => {
    navigation.replace(KEY_NAVIGATION.entry);
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: showButton.current
            ? COLOR.background_light
            : '#F0F0F0',
          marginBottom: showButton.current ? 32 : 0,
        },
      ]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: 24,
          paddingHorizontal: 12,
        }}
        style={{
          backgroundColor: COLOR.white,
          marginHorizontal: 12,
          marginTop: 24,
          marginBottom: 24,
          borderWidth: 1,
          borderRadius: 4,
          borderColor: '#DADADA',
        }}>
        <HTML
          tagsStyles={{
            span: {
              fontSize: SIZE.H4,
            },
            h6: {
              lineHeight: SIZE.H4 + 7,
              fontSize: SIZE.H4,
            },
            div: {
              overflow: 'hidden',
            },
            p: {
              lineHeight: SIZE.H4 + 7,
              fontSize: SIZE.H4,
              color: '#4D4D4D',
            },
            em: {
              fontSize: SIZE.H4,
              color: '#4D4D4D',
            },
            i: {
              fontSize: SIZE.H4,
              color: '#4D4D4D',
            },
          }}
          html={convertHtmlContent(DATA_POLICY)}
          imagesMaxWidth={SIZE.width(100)}
          onLinkPress={(e, href) => {
            Linking.canOpenURL(href).then((supported) => {
              if (supported) {
                Linking.openURL(href);
              } else {
              }
            });
          }}
        />
      </ScrollView>
      {showButton.current && (
        <AppTextButton
          title={'利用規約に同意してはじめる'}
          style={{
            height: SIZE.height(7.5),
            marginHorizontal: SIZE.width(3),
            backgroundColor: COLOR.white,
            borderRadius: 0,
          }}
          textStyle={{
            color: COLOR.COLOR_YELLOW,
            fontSize: SIZE.H4,
          }}
          onPress={onPressAcceptPolicy}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
  },
});
