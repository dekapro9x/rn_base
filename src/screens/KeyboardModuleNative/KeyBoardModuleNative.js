import React, {useEffect} from 'react';
import {View, Text, TextInput} from 'react-native';
import {Platform, NativeModules} from 'react-native';

export default function KeyBoardModuleNative() {
  useEffect(() => {
    const deviceLanguage =
      Platform.OS === 'ios'
        ? NativeModules.SettingsManager.settings.AppleLocale ||
          NativeModules.SettingsManager.settings.AppleLanguages[0] //iOS 13
        : NativeModules.I18nManager.localeIdentifier;

    console.log(deviceLanguage); //en_US
    return () => {};
  }, []);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text>KeyBoardModuleNative</Text>

      <TextInput
        textContentType="oneTimeCode"
        onKeyPress={(e) => console.log(e.nativeEvent.key)}
        style={{height: 30, width: 200, borderWidth: 1}}></TextInput>
    </View>
  );
}
