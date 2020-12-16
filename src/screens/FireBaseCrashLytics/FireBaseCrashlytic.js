import React, {useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {AppContainer} from '../../elements';
import {COLOR, SIZE} from '../../utils';
import crashlytics from '@react-native-firebase/crashlytics';

export default function FireBaseCrashlytic() {
  useEffect(() => {
    return () => {};
  }, []);
  const onSignIn = async (user) => {
    crashlytics().log('User signed in.');
    await Promise.all([
      crashlytics().setUserId(user.uid),
      crashlytics().setAttribute('credits', String(user.credits)),
      crashlytics().setAttributes({
        role: 'admin',
        followers: '13',
        email: user.email,
        username: user.username,
      }),
    ]);
  };

  return (
    <AppContainer
      haveTitle
      nameScreen={'FireBaseCrashlytic'}
      goBackScreen
      style={{backgroundColor: COLOR.backgroundColor}}>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <TouchableOpacity
          onPress={onSignIn}
          style={{
            borderRadius: SIZE.width(3),
            height: SIZE.height(6.5),
            width: SIZE.width(40),
            backgroundColor: COLOR.main_color_2,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{color: COLOR.white, fontWeight: 'bold', fontSize: SIZE.H5}}>
            FireBaseCrashlytic
          </Text>
        </TouchableOpacity>
      </View>
    </AppContainer>
  );
}
