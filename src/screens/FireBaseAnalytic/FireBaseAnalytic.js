import React, {useEffect} from 'react';
import {AppContainer, AppText} from '../../elements';
import {COLOR, SIZE} from '../../utils';
import {View, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/core';
export default function FireBaseCrashlytic() {
  const navigation = useNavigation();
  useEffect(() => {
    getIDFireBaseLogin();
    return () => {};
  }, []);

  const getIDFireBaseLogin = async () => {};
  const testCrashApp = () => {};
  return (
    <AppContainer
      haveTitle
      nameScreen={'FireBaseCrashlytic'}
      goBackScreen
      style={{backgroundColor: COLOR.backgroundColor}}>
      <View
        style={{
          flex: 1,
          backgroundColor: 'red',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <TouchableOpacity
          onPress={testCrashApp}
          style={{
            height: SIZE.height(7.5),
            width: SIZE.width(65),
            backgroundColor: 'green',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <AppText
            style={{fontWeight: 'bold', fontSize: SIZE.H4, color: COLOR.white}}>
            Test Crash
          </AppText>
        </TouchableOpacity>
      </View>
    </AppContainer>
  );
}
