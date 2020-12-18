import React, {useEffect} from 'react';
import {AppContainer, AppText} from '../../elements';
import {
  COLOR,
  KEY_ASYNC_STORE,
  KEY_NAVIGATION,
  SIZE,
  versionApp,
} from '../../utils';
import {View, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {FirebaseCrashlyticsInstant} from './item/FirebaseCrashlyticsInstant';
import AsyncStorage from '@react-native-community/async-storage';
export default function FireBaseCrashlytic() {
  const navigation = useNavigation();
  useEffect(() => {
    getIDFireBaseLogin();
    // navigation.navigate(KEY_NAVIGATION.firebase_auth, {
    //   param: 'LOGIN_GOOGLE',
    // });
    return () => {};
  }, []);

  const getIDFireBaseLogin = async () => {
    const accountLogin = await AsyncStorage.getItem(
      KEY_ASYNC_STORE.account_login_firebase,
    );
    console.log('accountLogin', accountLogin);
    if (accountLogin) {
      console.log('idAccount', idAccount);
      // FirebaseCrashlyticsInstant.crash.setUserId(`${idAccount}`);
      // FirebaseCrashlyticsInstant.crash.setAttribute(
      //   'IDHasError',
      //   `${idAccount}`,
      // );
      // crashlytics().setAttributes({
      //   type: 'user',
      //   version: `${versionApp}`,
      //   // email: user.email,
      // });
    } else {
      navigation.navigate(KEY_NAVIGATION.firebase_auth, {
        param: 'LOGIN_GOOGLE',
      });
    }
  };
  const testCrashApp = () => {
    try {
      if (createBug > 0) {
        console.log('Bug');
      }
    } catch (error) {
      FirebaseCrashlyticsInstant.crash.recordError(error);
      FirebaseCrashlyticsInstant.crash.log(error);
    }
  };
  const crashApp = () => {
    FirebaseCrashlyticsInstant.crash.crash();
  };
  return (
    <AppContainer
      haveTitle
      nameScreen={'FireBaseCrashlytic'}
      goBackScreen
      style={{backgroundColor: COLOR.backgroundColor}}>
      <View
        style={{
          flex: 1,
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
            borderRadius: SIZE.width(8),
          }}>
          <AppText
            style={{fontWeight: 'bold', fontSize: SIZE.H4, color: COLOR.white}}>
            Log Crash
          </AppText>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={crashApp}
          style={{
            height: SIZE.height(7.5),
            width: SIZE.width(65),
            backgroundColor: 'green',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: SIZE.width(3),
            borderRadius: SIZE.width(8),
          }}>
          <AppText
            style={{fontWeight: 'bold', fontSize: SIZE.H4, color: COLOR.white}}>
            Crash App Now
          </AppText>
        </TouchableOpacity>
      </View>
    </AppContainer>
  );
}
